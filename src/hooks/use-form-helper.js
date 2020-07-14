import React from 'react';
import { Form } from 'antd';
import Input from '@/components/input';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import {
  isArray,
  isNullOrUndefined,
  isBoolean,
  promisify,
  isFunction,
  isString,
} from '@/utils/base';
import clone from 'lodash/clone';

const Inner = Form.create()(
  React.forwardRef(function(props, ref) {
    const { form, callback, itemProps, initialValue } = props;
    const itemsRef = React.createRef();

    useImperativeHandle(ref, () => ({
      form,
      getItemComponent: field => itemsRef.current[field]?.current,
    }));

    function renderItems(items) {
      if (!isArray(items)) return null;
      return items.map(([label, field, component, others, _itemProps]) => {
        if (isNullOrUndefined(component)) component = [Input];
        if (!isArray(component)) component = [component];
        if (isNullOrUndefined(others)) others = { rules: others };
        if (isBoolean(others))
          others = {
            rules: [{ required: others, message: `${label} is required !` }],
          };

        const [_component, _props] = component;
        if (!itemsRef.current) itemsRef.current = {};
        if (!itemsRef.current[field]) {
          itemsRef.current[field] = React.createRef();
        }

        return (
          <Form.Item key={field} {...itemProps} {..._itemProps}>
            {form.getFieldDecorator(field, {
              initialValue: initialValue[field],
              ...others,
            })(
              React.createElement(_component, {
                ..._props,
                ref: itemsRef.current[field],
                placeholder: label,
              }),
            )}
          </Form.Item>
        );
      });
    }

    return callback({ renderItems, form });
  }),
);

/**
 * 表单hooks，提供构建表单的辅助方法
 * 1. 简单的表单渲染方法，由render的入参renderItems提供
 * 2. 初始值参数initialValue及初始值的设置方法setInitialValue
 * 3. 初始值的格式转换、表单提交前的格式转换
 * 4. promise化的表单校验方法validateFields
 * 5. 使用formHelper时无需使用Form.create包装组件
 * @returns {{ form, render, setInitialValue, validateFields }}
 */
export default function useFormHelper(props) {
  const {
    initialValue,
    transformRules,
    itemProps,
    transformRulesBeforeInit,
    transformRulesBeforeSubmit,
  } = props;
  const formRef = useRef();
  const initialValueRef = useRef(transformBeforeInit(initialValue));

  function transform(values, rules, resolves) {
    if (!isArray(rules)) return values;
    const _values = clone(values) || {};
    rules.forEach(([field, type, params]) => {
      if (isString(type)) {
        if (resolves[type]) {
          return resolves[type].call(null, _values, field, params);
        }
      } else if (isFunction(type)) {
        _values[field] = type.call(null, _values[field], _values);
      }
    });
    return _values;
  }

  // 初始化表单数据前对数据做转换
  function transformBeforeInit(values) {
    const rules = (transformRules || []).concat(transformRulesBeforeInit || []);
    return transform(values, rules, {
      array: (_values, field, [field0, field1]) => {
        _values = _values || {};
        const value0 = _values[field0];
        const value1 = _values[field1];
        if (isNullOrUndefined(value0) && isNullOrUndefined(value1)) return;
        _values[field] = [value0, value1];
      },
    });
  }

  // 表单提交前对数据做转换
  function transformBeforeSubmit(values) {
    const rules = (transformRules || []).concat(transformRulesBeforeSubmit || []);
    return transform(values, rules, {
      array: (_values, field, [field0, field1]) => {
        const [value0, value1] = _values[field] || [];
        _values[field0] = value0;
        _values[field1] = value1;
      },
    });
  }

  const formHelper = {};
  Object.defineProperties(formHelper, {
    form: {
      get: () => formRef.current?.form,
    },
  });

  formHelper.getItemComponent = field => formRef.current?.getItemComponent(field);

  formHelper.setInitialValue = initialValue => {
    Object.assign(initialValueRef.current, transformBeforeInit(initialValue));
  };

  formHelper.resetInitialValue = initialValue => {
    initialValueRef.current = transformBeforeInit(initialValue);
  };

  formHelper.render = callback => {
    return React.createElement(Inner, {
      itemProps,
      wrappedComponentRef: formRef,
      callback,
      initialValue: initialValueRef.current,
    });
  };

  formHelper.validateFields = async (...args) => {
    const { form } = formRef.current;
    const [err, values] = await promisify(form.validateFields, form)(...args);

    // // 表单校验有错误时，自动滚动到对应区域
    // if (err) {
    //   const labelDom = document.querySelector(`label[for=${Object.keys(err)[0]}]`);
    //   if (labelDom) {
    //     window.scrollTo(0, getElementTop(labelDom) - 80);
    //   }
    // }
    return [
      err,
      err
        ? values
        : {
            ...initialValueRef.current,
            ...transformBeforeSubmit(values),
          },
    ];
  };

  // 添加表单整体禁用状态控制参数
  formHelper.withFormDisabled = (items, disabled) => {
    if (!isArray(items)) return [];
    return items.map(([name, field, component, others, itemProps]) => {
      const [_component, _props] = isArray(component) ? component : [component, {}];
      return [
        name,
        field,
        [_component, { ..._props, disabled: _props.disabled || disabled }],
        others,
        itemProps,
      ];
    });
  };

  return formHelper;
}
