import styles from '../style.module.scss';
import { CloseOutlined, FullscreenOutlined, FullscreenExitOutlined, MinusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Login from './login';

export default function OperateBar() {
  const [maximized, setMaximized] = useState(false);
  useEffect(() => {
    window.ELECTRON.onMaximize((e, value) => {
      setMaximized(value);
    });
  }, []);

  return (
    <div className={styles.OperateBarClassName}>
      <Login />
      <span style={{ color: '#fff', display: 'flex', columnGap: 15 }}>
        <MinusOutlined style={{ cursor: 'pointer' }} title="最小化" onClick={window.ELECTRON.minimize} />
        {maximized ? (
          <FullscreenExitOutlined
            style={{ cursor: 'pointer' }}
            title="取消最大化"
            onClick={window.ELECTRON.unmaximize}
          />
        ) : (
          <FullscreenOutlined style={{ cursor: 'pointer' }} title="最大化" onClick={window.ELECTRON.maximize} />
        )}

        <CloseOutlined style={{ cursor: 'pointer' }} title="退出" onClick={window.ELECTRON.close} />
      </span>
    </div>
  );
}
