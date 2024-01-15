import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useEffect, useState, ComponentType, FunctionComponent } from 'react';
import myFavoriteStore from 'src/store/myFavoriteStore';

type LikeMusicProps = {
  /**
   * 歌曲数据
   */
  data: Music;
  /**
   * 是否喜欢，更新后的值
   */
  onLikeChange?: (value: boolean) => void;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export default function LikeMusic({ data, onLikeChange, ...props }: LikeMusicProps) {
  const [likeMusicIds] = myFavoriteStore((state) => [state.musicIds]);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (data) {
      setLiked(likeMusicIds.includes(data.id));
    }
  }, [likeMusicIds, data]);

  return (
    <span
      onClick={() => {
        if (onLikeChange) onLikeChange(!liked);
      }}
      {...props}
      style={{ cursor: 'pointer', ...props.style }}
    >
      {liked ? <HeartFilled style={{ color: 'var(--music-color)' }} /> : <HeartOutlined />}
    </span>
  );
}
