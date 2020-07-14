import React from 'react';
import { Input as AntdInput } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import { isFunction } from '@/utils/base';
import { useRef } from 'react';
import { useEffect } from 'react';

const paddingLeft = 11;

export default function Input(props) {
  const { className, placeholder, disabled, type, ...rest } = props;

  const inputRef = useRef();
  const placeholderRef = useRef();

  useEffect(() => {
    updateStyle();
  }, []);
  function onFocus() {
    const { type, onFocus } = props;
    if (type === 'password') {
      const inputDom = inputRef.current.input;
      if (inputDom) inputDom.type = 'password';
    }

    if (isFunction(onFocus)) onFocus();
  }

  function updateStyle() {
    const inputDom = inputRef.current.input;
    const placeholderDom = placeholderRef.current;
    if (!inputDom || !placeholderDom) return;

    inputDom.style.paddingLeft = `${placeholderDom.offsetWidth + 2 * paddingLeft}px`;
  }

  return (
    <div className={classnames(styles.inputContainer, className, disabled && styles.disabled)}>
      <AntdInput
        {...rest}
        className={styles.input}
        ref={inputRef}
        disabled={disabled}
        type={type === 'password' ? 'text' : type}
        onFocus={onFocus}
      />
      <span
        className={styles.placeholder}
        ref={placeholderRef}
        style={{ left: `${paddingLeft}px` }}
      >
        {placeholder}
      </span>
    </div>
  );
}
