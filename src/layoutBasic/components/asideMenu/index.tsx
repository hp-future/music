import { useState } from 'react';
import { HeartOutlined, DownloadOutlined, HistoryOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';

const mainMenuData = [
  { developing: false, title: '发现音乐', path: '/discoverMusic' },
  { developing: true, title: '播客', path: '' },
  { developing: true, title: '视频', path: '' },
  { developing: true, title: '关注', path: '' },
  { developing: true, title: '直播', path: '' },
  { developing: true, title: '私人漫游', path: '' },
];

const subMenuData = [
  { developing: false, title: '我的喜欢', icon: <HeartOutlined />, path: '/myFavorite' },
  { developing: true, title: '本地与下载', icon: <DownloadOutlined />, path: '' },
  { developing: true, title: '最近播放', icon: <HistoryOutlined />, path: '' },
];

/**
 * 侧边菜单
 */
export default function AsideMenu() {
  const [activeMenuItemName, setActiveMenuItemName] = useState('发现音乐');

  const navigate = useNavigate();
  const menuItemClick = (data: (typeof mainMenuData)[0]) => {
    setActiveMenuItemName(data.title);
    if (!data.developing) {
      navigate(data.path);
    } else {
      window.developing();
    }
  };

  return (
    <div className={styles.AsideMenuClassName}>
      <ul className={styles.mainMenu}>
        {mainMenuData.map((item) => (
          <li
            key={item.title}
            data-active={activeMenuItemName === item.title}
            className={styles.menuItem}
            onClick={() => menuItemClick(item)}
          >
            {item.title}
          </li>
        ))}
      </ul>
      <div className={styles.subTitle}>我的音乐</div>
      <ul>
        {subMenuData.map((item) => (
          <li
            key={item.title}
            data-active-sub={activeMenuItemName === item.title}
            className={styles.menuItem}
            onClick={() => menuItemClick(item)}
          >
            {item.icon}
            <span style={{ marginLeft: 5 }}>{item.title}</span>
          </li>
        ))}
      </ul>
      <div className={styles.subTitle}>创建的歌单</div>
    </div>
  );
}
