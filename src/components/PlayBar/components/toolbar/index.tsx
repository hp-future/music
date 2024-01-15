import styles from './style.module.scss';
// import SoundBar from './components/soundBar';
import PlaylistBar from './components/playlistBar';

export default function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <PlaylistBar />
      {/* <SoundBar /> */}
    </div>
  );
}
