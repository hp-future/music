import './styles/base.scss';
import './styles/antd.scss';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from 'src/router';
import { ConfigProvider, notification } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'src/request';
import DexieIndexedDB from 'src/store/dexieIndexedDB';

DexieIndexedDB.open();

// 敬请期待
window.developing = () => {
  notification.config({ maxCount: 1 });
  notification.info({
    message: '系统提示',
    description: '功能正在开发中，敬请期待...',
    placement: 'bottomRight',
  });
};

ReactDOM.createRoot(document.getElementById('app')).render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        borderRadius: 2,
      },
      components: {
        Tabs: {
          inkBarColor: 'var(--music-color)',
          itemSelectedColor: 'var(--music-color)',
          itemHoverColor: 'rgba(0, 0, 0, 0.88)',
        },
      },
    }}
    componentSize="small"
  >
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </ConfigProvider>
);
