import styles from '../style.module.scss';
import { MenuOutlined, FolderAddOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Popover, Table } from 'antd';
import moment from 'moment';
import PauseSvg from 'src/assets/icon/pause.svg';
import PlaySvg from 'src/assets/icon/play.svg';
import { Link } from 'react-router-dom';
import useResize from 'src/hooks/useResize';
import { useLiveQuery } from 'dexie-react-hooks';
import DexieIndexedDB from 'src/store/dexieIndexedDB';
import playingStore from 'src/store/playingStore';

/**
 * 播放列表
 */
export default function PlaylistBar() {
  return (
    <Popover
      trigger="click"
      placement="topRight"
      arrow={false}
      content={<Content />}
      overlayStyle={{ right: 0, bottom: 70, top: 40, width: 400 }}
    >
      <MenuOutlined style={{ cursor: 'pointer' }} />
    </Popover>
  );
}

function Content() {
  const tableHeight = useResize(() => window.innerHeight - 110 - 24 - 101);

  const musics = useLiveQuery(() => DexieIndexedDB.playingMusics.toArray());
  const [music, paused, updatePaused, updateMusic] = playingStore((state) => [
    state.music,
    state.paused,
    state.updatePaused,
    state.updateMusic,
  ]);

  return (
    <div className={styles.playlistContent}>
      <div className={styles.header}>
        <h2>当前播放</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#999' }}>总{musics?.length || 0}首</span>
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    textHoverBg: 'transparent',
                  },
                },
              }}
            >
              <Button
                type="text"
                icon={<FolderAddOutlined style={{ fontSize: 16 }} />}
                onClick={() => window.developing()}
              >
                收藏全部
              </Button>
              <Button type="text" style={{ marginLeft: 10, color: '#507DAF' }}>
                清空列表
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </div>
      <ConfigProvider renderEmpty={RenderEmpty}>
        <Table
          dataSource={musics}
          columns={[
            {
              dataIndex: 'paused',
              width: 20,
              onCell: () => ({ style: { paddingRight: 0, paddingLeft: 0, textAlign: 'center' } }),
              render: (value, record) => {
                if (music?.id !== record.id) return null;

                return (
                  <span style={{ cursor: 'pointer' }} onClick={() => updatePaused()}>
                    {paused ? (
                      <PauseSvg width={12} height={12} fill="var(--music-color)" />
                    ) : (
                      <PlaySvg width={12} height={12} fill="var(--music-color)" />
                    )}
                  </span>
                );
              },
            },
            {
              dataIndex: 'name',
              title: '标题',
              width: 140,
              ellipsis: true,
            },
            {
              dataIndex: 'ar',
              title: '歌手',
              ellipsis: true,
              width: 140,
              render: (value) => value.map((item: any) => item.name).join(' / '),
            },
            { dataIndex: 'dt', width: 60, title: '时间', render: (value) => moment(value).format('mm:ss') },
          ]}
          showHeader={false}
          scroll={{ y: tableHeight, x: 376 }}
          pagination={false}
          virtual
          onRow={(record) => ({
            onDoubleClick: () => updateMusic(record),
          })}
        />
      </ConfigProvider>
    </div>
  );
}

/**
 * 表格空状态
 */
function RenderEmpty() {
  // const [updatePlaylistVisible] = playingStore((state) => [state.updatePlaylistVisible]);

  return (
    <div style={{ color: '#999' }}>
      <div style={{ textAlign: 'center', margin: '100px 0 20px' }}>你还没有添加任何歌曲</div>
      <div style={{ textAlign: 'center' }}>
        <span>去首页</span>
        <Link to="/discovrMusic/personalized">
          <span style={{ color: '#333', cursor: 'pointer', textDecoration: 'underline' }}>发现音乐</span>
        </Link>
      </div>
    </div>
  );
}
