import styles from './style.module.scss';
import HeaderBar from './components/headerBar';
import AsideMenu from './components/asideMenu';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import KeepAlive, { AliveScope } from 'react-activation';
import { useEffect } from 'react';
import PlayBar from 'src/components/PlayBar';

/**
 * 基础布局
 */
export default function LayoutBasic() {
  // 重定向到 发现音乐
  const navigate = useNavigate();
  useEffect(() => {
    const timeid = setTimeout(() => navigate('/discoverMusic'), 0);
    return () => clearTimeout(timeid);
  }, []);

  const location = useLocation();

  return (
    <AliveScope>
      <div className={styles.LayoutBasicClassName}>
        <HeaderBar />
        <main className={styles.LayoutBasicMain}>
          <AsideMenu />
          <section className={styles.LayoutBasicMainContent}>
            <KeepAlive id={location.pathname + location.search + location.hash} style={{ height: '100%' }}>
              <Outlet />
            </KeepAlive>
          </section>
        </main>
        <PlayBar />
      </div>
    </AliveScope>
  );
}
