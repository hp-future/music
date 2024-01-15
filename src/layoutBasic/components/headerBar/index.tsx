import styles from './style.module.scss';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LogoSvg from 'src/assets/image/Music.svg';
import OperateBar from './components/OperateBar';

/**
 * 顶部区域
 */
export default function HeaderBar() {
  const navigate = useNavigate();

  return (
    <div className={styles.HeaderBarClassName}>
      <div className={styles.left}>
        <LogoSvg fill="#fff" width={20} height={20} />
        <span style={{ fontWeight: 'bold', color: '#fff' }}>MUSIC</span>
      </div>
      <div className={styles.right}>
        <div>
          <LeftOutlined
            style={{ color: '#fff', cursor: 'pointer', marginRight: 20 }}
            title="后退"
            onClick={() => navigate(-1)}
          />
          <RightOutlined style={{ color: '#fff', cursor: 'pointer' }} title="前进" onClick={() => navigate(1)} />
        </div>

        <OperateBar />
      </div>
    </div>
  );
}
