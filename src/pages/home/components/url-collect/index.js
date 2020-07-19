import React from 'react';
import { Row, Col } from 'antd';
import { urlCollect } from '@/constants/common';
import styles from './index.less';
import ConfigInfo from './config-info';

/* eslint-disable jsx-a11y/anchor-is-valid */

export default function UrlCollect() {
  const onUrlClick = url => {
    window.open(url, '_blank');
  };
  return (
    <>
      {/* 条纹区域 */}
      <div className={styles['url-content']}>
        {urlCollect.map(([name, url, flag], index) => (
          <Row key={index} className={styles.row} style={flag ? { marginTop: 20 } : null}>
            <Col span={6} className={styles.name}>
              {name}
            </Col>
            <Col span={16} className={styles.path}>
              <a onClick={() => onUrlClick(url)}>{url}</a>
            </Col>
          </Row>
        ))}
      </div>
      {/* 显示配置文件 */}
      <div className={styles['config-content']}>
        <ConfigInfo />
      </div>
    </>
  );
}
