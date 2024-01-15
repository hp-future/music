import useGetComment from './hooks/useGetComment';
import styles from './style.module.scss';
import { Button } from 'antd';
import { useState } from 'react';

export default function Comment() {
  const comments = useGetComment();
  const [type, setType] = useState('all');

  return (
    <div className={styles.comment}>
      <div className={styles.toolbar}>
        <Button type="text" className={type === 'all' ? 'is-active' : ''} onClick={() => setType('all')}>
          全部
        </Button>
        <Button type="text" className={type === 'hot' ? 'is-active' : ''} onClick={() => setType('hot')}>
          热门
        </Button>
      </div>
      <div className={styles.commentContent}>
        {comments[type === 'all' ? 'comments' : 'hotComments']?.map((item: any) => {
          return <CommentItem key={item.commentId} data={item} />;
        })}
      </div>
    </div>
  );
}

function CommentItem(props: { data: any }) {
  return (
    <div className={styles.commentItem}>
      <div className={styles.user}>
        <img src={props.data?.user?.avatarUrl} alt="用户头像" width={30} height={30} />
        <span>{props.data?.user?.nickname}</span>
        <span>{props.data?.timeStr}</span>
      </div>
      <div className={styles.content}>{props.data?.content}</div>
    </div>
  );
}
