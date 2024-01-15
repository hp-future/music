import { Tabs } from 'antd';
import styles from './style.module.scss';
import MusicTable from './components/MusicTable';

/**
 * 我的喜欢
 */
export default function MyFavorite() {
  return (
    <div className={styles.myFavor}>
      <Tabs
        items={[
          { key: 'A', label: '歌曲', children: <MusicTable /> },
          { key: 'B', label: '评论', children: null },
          { key: 'C', label: '收藏者', children: null },
        ]}
      />
    </div>
  );
}
