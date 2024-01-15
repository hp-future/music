import { Tabs } from 'antd';
import styles from './style.module.scss';
import Personalized from './components/personalized';

/**
 * 发现音乐
 */
export default function DiscoverMusic() {
  return (
    <div className={styles.DiscoverMusicClassName}>
      <Tabs
        style={{ height: '100%' }}
        items={[
          { label: '个性推荐', key: 'A', children: <Personalized /> },
          // { label: '专属定制', key: 'B', children: null },
          // { label: '歌单', key: 'C', children: null },
          // { label: '排行榜', key: 'D', children: null },
          // { label: '歌手', key: 'E', children: null },
          // { label: '最新音乐', key: 'F', children: null },
        ]}
      />
    </div>
  );
}
