import { useEffect, useState } from 'react';
import type { ModalProps } from 'antd';

let timer: NodeJS.Timeout;

// 获取二维码
export default function useQrimg(props: ModalProps) {
  const [qrimg, setQrimg] = useState('');
  const [reversion, setReversion] = useState({ code: 0, msg: '' });

  useEffect(() => {
    if (props.open) {
      refresh();
    } else {
      clearInterval(timer);
    }
  }, [props.open]);

  async function refresh() {
    const { data } = await window.fetchJson('/login/qr/key');
    const qr = await window.fetchJson(`/login/qr/create?key=${data.unikey}&qrimg=true`);
    setQrimg(qr.data.qrimg);
    setReversion({ code: 0, msg: '' });

    timer = setInterval(async () => {
      const statusRes = await window
        .fetch(`${window.baseUrl}/login/qr/check?key=${data.unikey}&timestamp=${Date.now()}`)
        .then((res) => res.json());
      if (statusRes.code === 800) {
        clearInterval(timer);
        setReversion({ code: 0, msg: '二维码已失效，请重新获取' });
      } else if (statusRes.code === 803) {
        clearInterval(timer);
        setReversion({ code: 1, msg: '登录成功' });
        window.localStorage.setItem('cookie', statusRes.cookie);
        setTimeout(() => {
          props.onOk(statusRes.cookie);
        }, 1000);
      }
    }, 3000);
  }

  return {
    qrimg,
    reversion,
    refresh,
  };
}
