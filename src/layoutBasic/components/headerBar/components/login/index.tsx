import styles from './style.module.scss';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useAsyncEffect } from 'ahooks';
import { useEffect, useState } from 'react';
import LoginModal from './loginModal';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<Record<string, any>>({});
  useEffect(() => {
    checkLoginStatus();
  }, []);

  /**
   * 检查登录状态
   * @param cookie
   */
  async function checkLoginStatus(cookie?: unknown) {
    cookie = cookie || window.localStorage.getItem('cookie');
    if (!cookie) {
      window.localStorage.removeItem('userInfo');
      setUserInfo({});
      return;
    }
    try {
      const formData = new FormData();
      formData.append('cookie', cookie as string);
      const { data } = await window.fetchJson(`/login/status?timestamp=${Date.now()}`, {
        method: 'POST',
        body: formData,
      });
      setUserInfo(data);
      window.localStorage.setItem('userInfo', JSON.stringify(data));
    } catch {
      window.localStorage.removeItem('userInfo');
      setUserInfo({});
    }
  }

  const navigate = useNavigate();

  return (
    <div className={styles.LoginClassName}>
      <span>
        <Avatar
          style={{ backgroundColor: '#E0E0E0', cursor: 'pointer', border: 'none' }}
          icon={<UserOutlined />}
          src={userInfo?.profile?.avatarUrl}
          onClick={() => {
            if (userInfo?.profile?.nickname) {
              navigate(`/userCenter?id=${userInfo?.profile?.userId}`);
            } else {
              setLoginModalVisible(true);
            }
          }}
        />
        <span className={styles.userName}>{userInfo?.profile?.nickname || '未登录'}</span>
      </span>

      <LoginModal open={loginModalVisible} onCancel={() => setLoginModalVisible(false)} onOk={checkLoginStatus} />
    </div>
  );
}
