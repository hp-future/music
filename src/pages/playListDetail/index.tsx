import CoverImg from 'src/components/CoverImg';
import styles from './style.module.scss';
import useDetail from './hooks/useDetail';
import { Tag, Button, Space, ConfigProvider, Tooltip, Tabs, Modal, Checkbox } from 'antd';
import { PlusOutlined, FolderAddOutlined, ShareAltOutlined, DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import PauseSvg from 'src/assets/icon/pause.svg';
import { useState } from 'react';
import { useDebounceFn } from 'ahooks';
import MusicTable from './components/musicTable';
import FilterMusic from './components/filterMusic';
import Comment from './components/comment';
import DexieIndexedDB from 'src/store/dexieIndexedDB';
import ignoreStore from 'src/store/ignoreStore';
import playingStore from 'src/store/playingStore';

/**
 * 歌单详情
 */
export default function PlayListDetail() {
  const { playlist, songs } = useDetail();

  const [filterValue, setFilterValue] = useState('');
  const { run: filterFn } = useDebounceFn((e) => setFilterValue(e.target.value), { wait: 500 });
  const [activeKey, setActiveKey] = useState('A');

  const [modalVisible, setModalVisible] = useState(false);
  const [playListPlayAllIgnore, updatePlayListPlayAllIgnore] = ignoreStore((state) => [
    state.playListPlayAllIgnore,
    state.updatePlayListPlayAllIgnore,
  ]);
  const [updateMusic] = playingStore((state) => [state.updateMusic]);

  /**
   * 播放全部
   */
  async function playAll() {
    if (songs.length > 0) {
      const keys = await DexieIndexedDB.playingMusics.toCollection().keys();
      await DexieIndexedDB.playingMusics.bulkDelete(keys);
      DexieIndexedDB.playingMusics.bulkAdd(songs);
      updateMusic(songs[0]);
    }
  }

  return (
    <div className={styles.PlayListDetailClassName}>
      <div className={styles.header}>
        <CoverImg
          rootStyle={{ flexShrink: 0 }}
          imgProps={{ src: playlist?.coverImgUrl || '', alt: '歌单封面', width: 180, height: 180 }}
        />
        <div className={styles.headerContent}>
          <div>
            <Tag style={{ borderColor: 'var(--music-color)', color: 'var(--music-color)', backgroundColor: '#fff' }}>
              歌单
            </Tag>
            <h2 style={{ margin: 0 }}>{playlist?.name}</h2>
          </div>
          <div>
            <img
              src={playlist?.creator?.avatarUrl || undefined}
              alt="歌单创建者头像"
              width={25}
              height={25}
              style={{ borderRadius: '50%', cursor: 'pointer' }}
            />
            <span style={{ fontSize: 12, margin: '0 5px', color: '#507DAF', cursor: 'pointer' }}>
              {playlist?.creator?.nickname}
            </span>
            <span style={{ fontSize: 12 }}>{moment(playlist?.createTime).format('YYYY-MM-DD')}创建</span>
          </div>
          <div style={{ columnGap: 10 }}>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    borderRadius: 16,
                    colorPrimaryHover: 'var(--music-color-hover)',
                    colorPrimaryBorder: 'var(--music-color)',
                    colorPrimaryActive: 'var(--music-color)',
                    colorPrimary: 'var(--music-color)',
                  },
                },
              }}
            >
              <Space.Compact>
                <Button
                  size="middle"
                  type="primary"
                  icon={<PauseSvg fill="#fff" width={12} height={12} />}
                  onClick={() => {
                    if (playListPlayAllIgnore) {
                      playAll();
                    } else {
                      setModalVisible(true);
                    }
                  }}
                >
                  播放全部
                </Button>
                <Button size="middle" type="primary" icon={<PlusOutlined />} onClick={playAll} />
              </Space.Compact>
              <Button size="middle" icon={<FolderAddOutlined />} onClick={() => window.developing()}>
                收藏({playlist?.subscribedCount})
              </Button>
              <Button size="middle" icon={<ShareAltOutlined />} onClick={() => window.developing()}>
                分享({playlist?.shareCount})
              </Button>
              <Button size="middle" icon={<DownloadOutlined />} onClick={() => window.developing()}>
                下载全部
              </Button>
            </ConfigProvider>
          </div>
          <div style={{ color: '#999' }}>
            <span>标签：</span>
            {playlist?.tags?.map((item: string, index: number, arr: any[]) => {
              return (
                <span key={item}>
                  <span style={{ color: '#507DAF' }}>{item}</span>
                  {index < arr.length - 1 ? <span style={{ margin: '0 5px' }}>/</span> : null}
                </span>
              );
            })}
          </div>
          <div style={{ color: '#999' }}>
            <span>播放：{playlist?.playCount}</span>
          </div>
          <div style={{ color: '#999' }}>
            <span style={{ flexShrink: 0 }}>简介：</span>
            <Tooltip
              title={playlist?.description}
              placement="bottomLeft"
              color="#fff"
              arrow={false}
              overlayInnerStyle={{
                color: 'rgba(0, 0, 0, 0.88)',
                fontSize: 12,
                whiteSpace: 'pre-wrap',
                maxWidth: 'calc(100vw - 500px)',
                maxHeight: 'calc(100vh - 300px)',
                overflow: 'auto',
              }}
              overlayStyle={{ maxWidth: 'none' }}
            >
              <div style={{ flex: '1 0 0', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {playlist?.description}
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        style={{ height: 'calc(100% - 200px)', marginTop: 20 }}
        tabBarExtraContent={activeKey === 'A' ? <FilterMusic value={filterValue} onChange={filterFn} /> : null}
        items={[
          {
            label: `歌曲列表(${songs.length})`,
            key: 'A',
            children: <MusicTable data={songs} filterKeyword={filterValue} />,
          },
          { label: `评论(${playlist?.commentCount || 0})`, key: 'B', children: <Comment /> },
          {
            label: `收藏者`,
            key: 'C',
            children: (
              <div className={styles.subscribers}>
                {playlist?.subscribers?.map((item: any) => {
                  return (
                    <div key={item.id} className={styles.subscribersItem}>
                      <img
                        src={item.avatarUrl || undefined}
                        alt="收藏者头像"
                        width={80}
                        height={80}
                        style={{ borderRadius: '50%' }}
                      />
                      <span>{item.nickname}</span>
                    </div>
                  );
                })}
              </div>
            ),
          },
        ]}
      />
      {/* 播放全部弹窗 */}
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: 'var(--music-color)',
              colorPrimaryHover: 'var(--music-color-hover)',
              colorPrimaryActive: 'var(--music-color)',
              colorPrimaryBorder: 'var(--music-color)',
            },
          },
        }}
      >
        <Modal
          open={modalVisible}
          mask={false}
          okText="继续"
          okButtonProps={{ style: { height: 30, width: 80, borderRadius: 15 } }}
          cancelButtonProps={{ style: { height: 30, width: 80, borderRadius: 15 } }}
          footer={(_, { OkBtn, CancelBtn }) => (
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <OkBtn />
              <span style={{ padding: '0 10px' }}></span>
              <CancelBtn />
            </div>
          )}
          onCancel={() => setModalVisible(false)}
          onOk={() => {
            setModalVisible(false);
            playAll();
          }}
          // style={{ height: '100%' }}
        >
          <h3 style={{ textAlign: 'center' }}>替换播放列表</h3>
          <div style={{ textAlign: 'center', margin: '40px 0 30px' }}>“播放全部”将会替换当前的播放列表，是否继续？</div>
          <div style={{ textAlign: 'center' }}>
            <Checkbox checked={playListPlayAllIgnore} onChange={(e) => updatePlayListPlayAllIgnore(e.target.checked)}>
              不再提醒
            </Checkbox>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
}
