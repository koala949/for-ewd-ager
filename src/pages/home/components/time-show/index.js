import React from 'react';
import styles from './index.less';
import moment from 'moment';
import { useInterval } from 'react-use';
import { useState } from 'react';

export default function TimeShow() {
  const [currentTime, setCurrentTime] = useState(null);

  useInterval(() => {
    setCurrentTime(moment().format('HH:mm:ss'));
  }, true);

  function getGreetWords() {
    const now = moment().hour();
    let word = '';
    if (now >= 5 && now < 9) {
      word = '早上好!';
    } else if (now >= 9 && now < 11) {
      word = '上午好!';
    } else if (now >= 11 && now < 13) {
      word = '中午好!';
    } else if (now >= 13 && now < 18) {
      word = '下午好!';
    } else if (now >= 18 && now < 22) {
      word = '晚上好!';
    } else {
      word = '夜深了!';
    }
    return `${word}`;
  }

  return (
    <div className={styles.time}>
      <div className={styles.title}>{getGreetWords()}</div>
      <div className={styles.time}>{currentTime}</div>
    </div>
  );
}
