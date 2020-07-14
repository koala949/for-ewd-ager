import React from 'react';
import styles from './index.less';
import NoData from './assets/no-data.svg';

const obj = {
  'no-data': NoData,
};
const titleObj = {
  'no-data': 'No Information',
};
export default function NoStatus(props) {
  const { style = {}, type = 'no-data', title, subTitle, imgStyle = {}, imgSrc = null } = props;
  return (
    <div className={props.className || styles.container} style={style}>
      <img src={imgSrc || obj[type]} alt="" style={imgStyle} />
      <div className={props.titleClassName || styles.title}>{title || titleObj[type]}</div>
      {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
    </div>
  );
}
