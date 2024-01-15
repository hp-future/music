import CoverImg from 'src/components/CoverImg';
import styles from './style.module.scss';
import { HeartOutlined, HeartFilled, FolderAddOutlined, DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import playingStore from 'src/store/playingStore';
import MusicDetail from './MusicDetail';
import { classNames } from 'src/utils';
import UpSvg from 'src/assets/icon/up.svg';
import LikeMusic from 'src/components/LikeMusic';
import DexieIndexedDB from 'src/store/dexieIndexedDB';

export default function Music() {
  const [music, musicDetailVisible, updateMusicDetailVisible] = playingStore((state) => [
    state.music,
    state.musicDetailVisible,
    state.updateMusicDetailVisible,
  ]);

  if (!music) return <div className={styles.musicClassName} />;

  return (
    <div className={classNames(styles.musicClassName, musicDetailVisible ? styles.showDetail : '')}>
      <div className={styles.detail}>
        <span title="收起音乐详情页" onClick={() => updateMusicDetailVisible()}>
          <UpSvg style={{ transform: 'rotate(180deg)', cursor: 'pointer' }} />
        </span>
        <div style={{ display: 'flex', columnGap: 10 }}>
          <HeartFilled title="喜欢" className={styles.btn} style={{ color: 'var(--music-color)' }} />
          <FolderAddOutlined title="收藏" className={styles.btn} />
          <DownloadOutlined title="下载" className={styles.btn} />
          <ShareAltOutlined title="分享" className={styles.btn} />
        </div>
      </div>
      <div className={styles.imgbox}>
        <CoverImg
          imgProps={{
            src: music?.al?.picUrl || undefined,
            alt: '歌曲封面',
            width: 40,
            height: 40,
          }}
          imgBoxClassName={styles.imgBoxClassName}
        >
          <div className={styles.mask} title="展开音乐详情页" onClick={() => updateMusicDetailVisible()}>
            <UpSvg fill="#fff" style={{ marginTop: 12 }} title="收起音乐详情页" />
          </div>
        </CoverImg>
        <div style={{ marginLeft: 10 }}>
          <div style={{ lineHeight: 1 }}>
            <span>{music?.name}</span>
            <LikeMusic
              data={music}
              style={{ marginLeft: 5 }}
              onLikeChange={(value) => {
                if (value) {
                  DexieIndexedDB.likeMusics.add(music);
                } else {
                  DexieIndexedDB.likeMusics.delete(music.id);
                }
              }}
            />
          </div>
          <div style={{ color: '#999' }}>{music?.ar?.map((item: any) => item.name).join(' / ')}</div>
        </div>
      </div>

      <MusicDetail />
    </div>
  );
}
