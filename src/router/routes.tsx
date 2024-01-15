import { RouteObject } from 'react-router-dom';
import LayoutBasic from 'src/layoutBasic';
import DiscoverMusic from 'src/pages/discoverMusic';
import PlayListDetail from 'src/pages/playListDetail';
import MyFavorite from 'src/pages/MyFavorite';
import UserCenter from 'src/pages/UserCenter';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutBasic />,
    children: [
      { path: '/discoverMusic', element: <DiscoverMusic /> },
      { path: '/playListDetail', element: <PlayListDetail /> },
      { path: '/myFavorite', element: <MyFavorite /> },
      { path: '/userCenter', element: <UserCenter /> },
    ],
  },
];

export { routes };
