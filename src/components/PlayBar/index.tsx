import Toolbar from './components/toolbar';
import Music from './components/music';
import Player from './components/player';
import styles from './style.module.scss';

/**
 * 播放工具栏
 */
export default function PlayBar() {
  return (
    <div className={styles.PlayBarClassName}>
      <Music />
      <Player />
      <Toolbar />
    </div>
  );
}
