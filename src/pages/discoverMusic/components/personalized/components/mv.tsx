import styles from '../style.module.scss';
import { useState, useRef } from 'react';
import { useAsyncEffect } from 'ahooks';
import CoverImg from 'src/components/CoverImg';
import useResize from 'src/hooks/useResize';

export default function MV() {
  const [list, setList] = useState<any[]>([]);
  useAsyncEffect(async () => {
    const { result } = await window.fetchJson('/personalized/mv');
    setList(result);
  }, []);

  const imgWidth = useResize(() => {
    if (window.innerWidth > 1600) {
      return (1300 - 45) / 5;
    }

    return (window.innerWidth - 200 - 48 - 45) / 5;
  });

  return (
    <div className={styles.personalizedMv}>
      <h1>推荐MV</h1>
      <div className={styles.mvContent}>
        {list.map((item) => {
          return (
            <CoverImg
              key={item.picUrl}
              rootClassName={styles.contentItem}
              imgProps={{ src: item.picUrl, alt: item.copywriter, width: imgWidth }}
              playCount={item.playCount}
              title={
                <div>
                  <div>{item.name}</div>
                  <div style={{ color: '#999' }}>{item.artists.map((ele: any) => ele.name).join(' / ')}</div>
                </div>
              }
            />
          );
        })}
      </div>
    </div>
  );
}
