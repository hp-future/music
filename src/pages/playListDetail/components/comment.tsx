import { Input, ConfigProvider, Button, List, Divider } from 'antd';
import { LikeOutlined, ShareAltOutlined, MessageOutlined } from '@ant-design/icons';
import styles from '../style.module.scss';
import HuatiSvg from 'src/assets/icon/huati.svg';
import TijiSvg from 'src/assets/icon/tiji.svg';
import BiaoqingSvg from 'src/assets/icon/biaoqing.svg';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';

export default function Comment() {
  const [searchParams] = useSearchParams();
  const playListId = searchParams.get('id');

  const [comments, setComments] = useState<any[]>([]);
  const [hotComments, setHotComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isMore, setIsMore] = useState(true);
  useEffect(() => {
    getMoreComment();
  }, [playListId]);

  /**
   * 加载更多评论
   */
  const getMoreComment = async () => {
    setLoading(() => true);
    try {
      const data = await window.fetchJson(`/comment/playlist?id=${playListId}&offset=${page * 20}`);
      setComments((prev) => prev.concat(data.comments) || []);
      setHotComments((prev) => prev.concat(data.hotComments) || []);
      setPage((prev) => (prev += 1));
      setIsMore(data.more);
    } finally {
      setLoading(() => false);
    }
  };

  return (
    <div className={styles.comment}>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              activeBorderColor: '#d9d9d9',
              hoverBorderColor: '#d9d9d9',
            },
            Button: {
              colorPrimaryHover: 'var(--music-color-hover)',
              colorPrimaryBorder: 'var(--music-color)',
              colorPrimaryActive: 'var(--music-color)',
              colorPrimary: 'var(--music-color)',
            },
          },
        }}
      >
        <div className={styles.commentInput}>
          <Input.TextArea autoSize={{ maxRows: 4, minRows: 4 }} style={{ boxShadow: 'none' }} />
          <div className={styles.commentInputToolbar}>
            <div className={styles.left}>
              <HuatiSvg />
              <TijiSvg />
              <BiaoqingSvg />
            </div>
            <div className={styles.right}>
              <Button style={{ borderRadius: 12 }} onClick={() => window.developing()}>
                评论
              </Button>
            </div>
          </div>
        </div>
      </ConfigProvider>
      <div className={styles.commentContent}>
        <List
          dataSource={comments}
          renderItem={(item) => {
            return (
              <List.Item className={styles.listItem} key={item.commentId}>
                <img
                  src={item.user.avatarUrl || undefined}
                  alt="用户头像"
                  width={40}
                  height={40}
                  style={{ flexShrink: 0, verticalAlign: 'top', marginRight: 10, borderRadius: '50%' }}
                />
                <div className={styles.listItemContent}>
                  <div>
                    <span style={{ color: '#579ddb' }}>{item.user.nickname}：</span>
                    <span>{item.content}</span>
                  </div>
                  <div className={styles.bottom}>
                    <div>{moment(item.time).format('YYYY年MM月DD日 HH:mm:ss')}</div>
                    <div className={styles.operate}>
                      <span className={styles.operateItem}>
                        <LikeOutlined />
                        <span style={{ verticalAlign: 'middle', marginLeft: 3 }}>{item.likedCount}</span>
                      </span>
                      <Divider type="vertical" />
                      <span className={styles.operateItem}>
                        <ShareAltOutlined />
                      </span>
                      <Divider type="vertical" />
                      <span className={styles.operateItem}>
                        <MessageOutlined />
                      </span>
                    </div>
                  </div>
                </div>
              </List.Item>
            );
          }}
        />
        <Divider style={{ display: !isMore ? 'none' : 'flex' }}>
          <Button type="text" onClick={getMoreComment} loading={loading} disabled={loading}>
            {loading ? '正在加载中...' : '加载更多评论'}
          </Button>
        </Divider>
      </div>
    </div>
  );
}
