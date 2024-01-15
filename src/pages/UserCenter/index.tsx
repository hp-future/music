import { useAsyncEffect } from 'ahooks';
import styles from './style.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Divider, Tabs } from 'antd';
import GenderFemaleSvg from 'src/assets/icon/gender-female.svg';
import GenderMaleSvg from 'src/assets/icon/gender-male.svg';

const style = {
  height: 18,
  width: 18,
  borderRadius: '50%',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
};
// 性别svg
const Gender = [
  <span style={{ backgroundColor: '#FFCCE7', ...style }}>
    <GenderFemaleSvg />
  </span>,
  <span style={{ backgroundColor: '#BFF3FF', ...style }}>
    <GenderMaleSvg />
  </span>,
];

/**
 * 用户中心
 */
export default function UserCenter() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');
  const [userInfo, setUserInfo] = useState<Record<string, any>>({});
  useAsyncEffect(async () => {
    if (userId) {
      const data = await window.fetchJson(`/user/detail?uid=${userId}`);
      setUserInfo(data);
      const cookie = window.localStorage.getItem('cookie');
      const formData = new FormData();
      formData.append('cookie', cookie);
      const a = await window
        .fetch(window.baseUrl + '/user/account', { method: 'POST', body: formData })
        .then((res) => res.json());
      console.log(a);
    }
  }, [userId]);

  return (
    <div className={styles.UserCenterClassName}>
      <div className={styles.header}>
        <img
          src={userInfo?.profile?.avatarUrl}
          alt="用户头像"
          width={170}
          height={170}
          style={{ borderRadius: '50%' }}
        />
        <div className={styles.main}>
          <h1 style={{ margin: 0 }}>{userInfo?.profile?.nickname}</h1>
          <span>{Gender[userInfo?.profile?.gender]}</span>
          <Divider style={{ margin: '0 0 15px 0' }} />
          <div style={{ display: 'inline-flex', columnGap: 1, backgroundColor: '#eee', marginBottom: 10 }}>
            <div className={styles.followeds}>
              <div>{userInfo?.profile?.eventCount}</div>
              <div>动态</div>
            </div>
            <div className={styles.followeds}>
              <div>{userInfo?.profile?.newFollows}</div>
              <div>关注</div>
            </div>
            <div className={styles.followeds}>
              <div>{userInfo?.profile?.followeds}</div>
              <div>粉丝</div>
            </div>
          </div>
          {/* <div>
            <span>所在地区：{}</span>
          </div> */}
          <div>
            <span>个人介绍：</span>
            <span>{userInfo?.profile?.signature}</span>
          </div>
        </div>
      </div>
      <Tabs
        style={{ height: 'calc(100% - 170px)' }}
        items={[
          { label: '创建的歌单', key: 'A', children: null },
          { label: '收藏的歌单', key: 'B', children: null },
          { label: '收藏的播客', key: 'C', children: null },
          { label: '创建的音乐专栏', key: 'D', children: null },
        ]}
      />
    </div>
  );
}
