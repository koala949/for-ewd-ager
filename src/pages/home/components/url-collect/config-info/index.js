import React, { useState } from 'react';
import { Row, Col, Divider, Tag, Popover } from 'antd';
import styles from './index.less';
import { configInfo } from '@/constants/common';

export default function ConfigInfo() {
  const [active, setActive] = useState(null);

  const onCardSelect = v => {
    setActive(v);
  };
  function popRender(item) {
    return (
      <div>
        {item.list.map((one, index) => (
          <div key={index}>{`${one[0]}：${one[1]}`}</div>
        ))}
      </div>
    );
  }
  function configItemRender(one) {
    return (
      <>
        <div className={styles.title}>{one.title}</div>
        <Divider />
        <div className={styles.param}>
          {one.paramList.map((v, index) => (
            // v是二维数组
            <Popover
              content={popRender(v)}
              title={v.name}
              trigger="click"
              placement="bottom"
              key={index}
            >
              <Tag color="blue">{v.name}</Tag>
            </Popover>
          ))}
        </div>
      </>
    );
  }
  return (
    <Row
      className={styles['configs-row']}
      style={configInfo.length <= 3 ? { overflow: 'hidden' } : null}
    >
      {configInfo.map((one, index) => (
        <Col
          span={7}
          key={one.id}
          className={
            active !== index
              ? styles['config-col']
              : `${styles['active-col']} ${styles['config-col']}`
          }
          onClick={() => onCardSelect(index)}
        >
          {configItemRender(one)}
        </Col>
      ))}
    </Row>
  );
}
