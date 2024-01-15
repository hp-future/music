import { Table, ConfigProvider, Modal } from 'antd';
import { HeartFilled, DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import useResize from 'src/hooks/useResize';
import { useLiveQuery } from 'dexie-react-hooks';
import dexieIndexedDB from 'src/store/dexieIndexedDB';

export default function MusicTable() {
  const tableHeight = useResize(() => window.innerHeight - 110 - 54 - 10 - 40);
  const musics = useLiveQuery(() => dexieIndexedDB.likeMusics.toArray());

  // 从我喜欢的音乐中删除
  const [modalInstance, modalContextHolder] = Modal.useModal();
  function removeMusic(data: any) {
    const infoModal = modalInstance.info({
      icon: null,
      content: <div style={{ textAlign: 'center', margin: '50px 0 40px' }}>确定将选中的歌曲从我喜欢的音乐中删除？</div>,
      closable: true,
      mask: false,
      okButtonProps: { style: { height: 30, width: 80, borderRadius: 15 } },
      onOk: () => {
        dexieIndexedDB.likeMusics.delete(data.id);
        infoModal.destroy();
      },
      footer: (_, { OkBtn }) => (
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
          <div style={{ textAlign: 'center' }}>
            <OkBtn />
          </div>
        </ConfigProvider>
      ),
    });
  }

  return (
    <ConfigProvider renderEmpty={RenderEmpty}>
      <div style={{ height: '100%' }}>
        <Table
          pagination={false}
          virtual
          scroll={{ y: tableHeight, x: window.innerWidth - 200 - 48 }}
          dataSource={musics}
          columns={[
            {
              title: '操作',
              align: 'center',
              width: 150,
              render: (value, record, index) => {
                return (
                  <div style={{ color: '#999' }}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span style={{ cursor: 'pointer', margin: '0 10px' }} onClick={() => removeMusic(record)}>
                      <HeartFilled style={{ color: 'var(--music-color)' }} title="取消喜欢" />
                    </span>
                    <span>
                      <DownloadOutlined style={{ cursor: 'pointer' }} title="下载" />
                    </span>
                  </div>
                );
              },
            },
            { dataIndex: 'name', title: '标题', ellipsis: true },
            {
              dataIndex: 'ar',
              title: '歌手',
              ellipsis: true,
              render: (value) => value.map((item: any) => item.name).join(' / '),
            },
            { dataIndex: 'al', title: '专辑', ellipsis: true, render: (value) => value.name },
            { dataIndex: 'dt', title: '时间', render: (value) => moment(value).format('mm:ss') },
          ]}
        />
        {modalContextHolder}
      </div>
    </ConfigProvider>
  );
}

/**
 * 表格空状态
 */
function RenderEmpty() {
  return (
    <div style={{ color: '#999' }}>
      <div style={{ textAlign: 'center', margin: '100px 0 20px' }}>赶快去收藏你喜欢的音乐</div>
      <div style={{ textAlign: 'center' }}></div>
    </div>
  );
}
