import { Input, Icon } from 'antd';
import styles from './index.less';
import { useState, useEffect } from 'react';
import { isFunction } from '@/utils/base';

export default function Search({
  onSearch,
  prefixName = '',
  initialValue = '',
  placeholder,
  style,
  theme = 'white',
}) {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  function onChange(e) {
    setValue(e.target.value);
  }

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  async function onPressEnter() {
    if (!isFunction(onSearch)) return;
    setLoading(true);
    const isContinue = await onSearch(value);
    if (isContinue === false) return;
    setLoading(false);
  }
  return (
    <Input
      prefix={
        <span className={styles.prefix} onClick={onPressEnter}>
          <Icon type="search" />
        </span>
      }
      className={`${styles.input} ${styles[prefixName && 'hasName']} ${
        theme === 'gray' ? 'theme-gray' : ''
      }`}
      value={value}
      onChange={onChange}
      onPressEnter={onPressEnter}
      suffix={loading ? <Icon type="loading" /> : null}
      placeholder={placeholder}
      style={style}
    />
  );
}
