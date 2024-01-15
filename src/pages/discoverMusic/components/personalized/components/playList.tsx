import { useRef, useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import styles from '../style.module.scss';
import CoverImg from 'src/components/CoverImg';
import useResize from 'src/hooks/useResize';
import PauseSvg from 'src/assets/icon/pause.svg';
import { useNavigate } from 'react-router-dom';

export default function PlayList() {
  const [playLists, setPlayLists] = useState<any[]>([]);
  useAsyncEffect(async () => {
    const { result } = await window.fetchJson('/personalized?limit=10');
    setPlayLists(result);
  }, []);

  const imgWidth = useResize(() => {
    if (window.innerWidth > 1600) {
      return (1300 - 60) / 5;
    }

    return (window.innerWidth - 200 - 48 - 60) / 5;
  });

  const navigate = useNavigate();

  return (
    <div className={styles.playList}>
      <h1>推荐歌单</h1>
      <div className={styles.content}>
        {playLists.map((item, index) => (
          <CoverImg
            key={item.picUrl + '_' + index}
            rootClassName={styles.contentItem}
            imgBoxClassName={styles.imgBox}
            imgProps={{
              src: item.picUrl,
              alt: '歌单封面1',
              width: imgWidth,
              height: imgWidth,
              onClick: () => navigate(`/playListDetail?id=${item.id}`),
            }}
            playCount={item.playCount}
            title={item.name}
          >
            <div
              className={styles.playBtn}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className={styles.playBtnInner}>
                <PauseSvg style={{ marginLeft: 3 }} fill="var(--music-color)" />
              </div>
            </div>
          </CoverImg>
        ))}
      </div>
    </div>
  );
}
