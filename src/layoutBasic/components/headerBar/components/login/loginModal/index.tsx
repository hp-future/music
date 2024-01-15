import { useAsyncEffect, useInterval } from 'ahooks';
import { Button, ConfigProvider, Modal, ModalProps } from 'antd';
import { useState } from 'react';
import styles from './style.module.scss';
import useQrimg from './useQrimg';

export default function LoginModal(props: ModalProps) {
  const { qrimg, reversion, refresh } = useQrimg(props);

  return (
    <Modal mask centered footer={null} width={350} {...props}>
      <div className={styles.LoginModalContentClassName}>
        <h1 style={{ textAlign: 'center' }}>扫码登录</h1>
        <div className={styles.imgbox}>
          <img src={qrimg} alt="二维码" width={170} height={170} style={{ display: 'block' }} />
          <div className={styles.mask} style={{ display: reversion.msg ? 'block' : 'none' }}>
            <div className={styles.maskContent}>
              <div style={{ color: '#fff', textAlign: 'center', fontSize: 12, marginBottom: 10 }}>{reversion.msg}</div>
              {reversion.code ? null : (
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        colorPrimary: 'var(--music-color)',
                        colorPrimaryHover: 'var(--music-color-hover)',
                        colorPrimaryActive: 'var(--music-color)',
                        colorPrimaryBorder: 'var(--music-color)',
                      },
                    },
                  }}
                >
                  <Button type="primary" onClick={refresh}>
                    刷新
                  </Button>
                </ConfigProvider>
              )}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 15, textAlign: 'center' }}>请使用网易云音乐APP扫码登录</div>
      </div>
    </Modal>
  );
}
