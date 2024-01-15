import { Table } from 'antd';
import { useMemo } from 'react';
import useResize from 'src/hooks/useResize';
import styles from '../style.module.scss';
import { HeartOutlined, DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import LikeMusic from 'src/components/LikeMusic';
import DexieIndexedDB from 'src/store/dexieIndexedDB';

interface MusicTableProps {
  /**
   * 歌曲
   */
  data: any[];
  /**
   * 过滤条件
   */
  filterKeyword: string;
}

export default function MusicTable(props: MusicTableProps) {
  // 歌曲列表高度
  const tableHeight = useResize(() => window.innerHeight - 40 - 48 - 180 - 20 - 38 - 16 - 39);

  const songs = useMemo(() => {
    const keywordReg = new RegExp(props.filterKeyword, 'i');
    return props.data.filter((item) => {
      return (
        keywordReg.test(item.name) ||
        item.ar.some((ele: any) => keywordReg.test(ele.name)) ||
        keywordReg.test(item.al.name)
      );
    });
  }, [props.data, props.filterKeyword]);

  // 高亮关键词
  function highlightKeyword(text: string) {
    const keywordReg = new RegExp(props.filterKeyword, 'gi');
    if (keywordReg.test(text)) {
      const matchResult = text.match(keywordReg);
      const ele = `<span style="color: var(--music-color)">${matchResult[0]}</span>`;
      return <span dangerouslySetInnerHTML={{ __html: text.replaceAll(keywordReg, ele) }} />;
    }

    return text;
  }

  return (
    <Table
      pagination={false}
      scroll={{ y: tableHeight || 0, x: window.innerWidth - 200 - 48 }}
      virtual
      dataSource={songs}
      rowKey="id"
      columns={[
        {
          title: '操作',
          align: 'center',
          width: 120,
          render: (value, record, index) => {
            return (
              <div className={styles.operate}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <LikeMusic
                  style={{ margin: '0 10px 0 15px' }}
                  data={record}
                  onLikeChange={(value) => {
                    if (value) {
                      DexieIndexedDB.likeMusics.add(record);
                    } else {
                      DexieIndexedDB.likeMusics.delete(record.id);
                    }
                  }}
                />
                <DownloadOutlined className={styles.operateBtn} />
              </div>
            );
          },
        },
        { dataIndex: 'name', title: '标题', render: (value) => highlightKeyword(value) },
        {
          dataIndex: 'ar',
          title: '歌手',
          render: (value) => {
            const text = value.map((item: any) => item.name).join(' / ');
            return highlightKeyword(text);
          },
        },
        { dataIndex: 'al', title: '专辑', render: (value) => highlightKeyword(value.name) },
        { dataIndex: 'dt', title: '时间', render: (value) => moment(value).format('mm:ss') },
      ]}
    />
  );
}
