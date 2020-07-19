import React from 'react';
import { Row } from 'antd';
import styles from './index.less';
import UrlCollect from './components/url-collect';
import ManAnimate from './components/man-animate';
import TimeShow from './components/time-show';
export default function() {
  return (
    <Row className={styles.basicWarp}>
      {/* 悬浮的阴影框 */}
      <div className={styles.info}>
        <div className={styles.container}>
          <UrlCollect />
          <TimeShow />
        </div>
      </div>
      {/* 动画 */}
      <div className={styles.person}>
        <ManAnimate />
      </div>
    </Row>
  );
}
