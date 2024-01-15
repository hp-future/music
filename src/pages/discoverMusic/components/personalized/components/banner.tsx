import { Carousel } from 'antd';
import { useAsyncEffect } from 'ahooks';
import { useState } from 'react';
import useResize from 'src/hooks/useResize';
import styles from '../style.module.scss';

export default function Banner() {
  const [bannerList, setBannerList] = useState<any[]>([]);
  useAsyncEffect(async () => {
    const { banners } = await window.fetchJson('/banner');
    setBannerList(banners || []);
  }, []);

  const bannerHeight = useResize(() => (window.innerWidth > 1600 ? 260 : 200));

  return (
    <div style={{ paddingBottom: 12 }}>
      <Carousel autoplay>
        {bannerList.map((item, index) => {
          return (
            <div key={item.imageUrl + '_' + index}>
              <div
                className={styles.bannerItem}
                style={{ backgroundImage: `url(${item.imageUrl}?imageView&blur=40x20)` }}
              >
                <div className={styles.imgbox}>
                  <img src={item.imageUrl + '?imageView&quality=89'} alt={item.typeTitle} height={bannerHeight} />
                  <span className={styles.typeTitle}>{item.typeTitle}</span>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
