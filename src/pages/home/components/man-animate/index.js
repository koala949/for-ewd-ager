import React from 'react';
import styles from './index.less';

export default function ManAnimate() {
  return (
    <div className={styles['g-container']}>
      <div className={styles['g-line']}></div>
      <div className={styles['g-ground']}></div>
      <div className={styles['g-man']}>
        <div className={styles['g-hand']}></div>
      </div>
    </div>
  );
}
