import React, { useEffect } from 'react';
import { Modal } from 'antd';
import styles from './index.less';

export default function PlatModal(props) {
  const { title, visible, ...others } = props;

  useEffect(() => {
    if (visible) {
      document.querySelector('html').classList.add(styles['overflow-hidden']);
    } else {
      document.querySelector('html').classList.remove(styles['overflow-hidden']);
    }
    return () => {
      document.querySelector('html').classList.remove(styles['overflow-hidden']);
    };
  }, [visible]);
  return (
    <Modal
      wrapClassName={styles['plat-modal']}
      centered
      width={300}
      bodyStyle={{ padding: 24 }}
      visible={visible}
      okText={'OK'}
      cancelText={'Cancel'}
      {...others}
    >
      <div className={styles.content}>
        <div className={props.titleClassName || styles.title}>{title}</div>
        {props.children}
      </div>
    </Modal>
  );
}

PlatModal.info = args => Modal.info(args);
PlatModal.success = args => Modal.success(args);
PlatModal.error = args => Modal.error(args);
PlatModal.warning = args => Modal.warning(args);
PlatModal.confirm = args => Modal.confirm(args);
PlatModal.destroyAll = args => Modal.destroyAll(args);
PlatModal.useModal = args => Modal.useModal(args);
