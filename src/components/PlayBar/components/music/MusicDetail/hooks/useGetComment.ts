import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import playingStore from 'src/store/playingStore';

/**
 * 获取歌曲评论
 */
export default function useGetComment() {
  const [music] = playingStore((state) => [state.music]);

  const [comment, setComment] = useState<Record<string, any>>({});

  useAsyncEffect(async () => {
    if (music) {
      const data = await window.fetchJson(`/comment/music?id=${music.id}&limit=10`);
      setComment(data);
    }
  }, [music]);

  return comment;
}
