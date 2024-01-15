import playingStore from 'src/store/playingStore';
import { classNames } from 'src/utils';
import styles from './style.module.scss';
import UpSvg from 'src/assets/icon/up.svg';
import AlbumSvg from 'src/components/AlbumSvg';
import useGetLyric from './hooks/useGetLyric';
import Comment from './Comment';

export default function MusicDetail() {
  const [musicDetailVisible, music, updateMusicDetailVisible] = playingStore((state) => [
    state.musicDetailVisible,
    state.music,
    state.updateMusicDetailVisible,
  ]);

  const lyric = useGetLyric();

  return (
    <div className={classNames(styles.MusicDetailClassName, musicDetailVisible ? styles.show : '')}>
      <div className={styles.header}>
        <div className={styles.left}>
          <span title="收起音乐详情页" onClick={() => updateMusicDetailVisible()}>
            <UpSvg fill="#fff" style={{ transform: 'rotate(180deg)', cursor: 'pointer' }} />
          </span>
        </div>
        <div className={styles.right}></div>
      </div>
      <div className={styles.content}>
        <div style={{ display: 'flex' }}>
          <AlbumSvg coverImgSrc={music?.al?.picUrl || undefined} />
          <div className={styles.lyricContent}>
            <h1 style={{ textAlign: 'center' }}>{music?.name || ''}</h1>
            {lyric.map((item) => (
              <div key={item.time} className={styles.lyricItem} data-time={item.time.split('.')[0]}>
                {item.text}
              </div>
            ))}
          </div>
        </div>
        <Comment />
      </div>
    </div>
  );
}
