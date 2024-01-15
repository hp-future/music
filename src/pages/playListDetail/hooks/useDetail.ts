import { useSearchParams } from 'react-router-dom';
import { useAsyncEffect } from 'ahooks';
import { useState } from 'react';

type Detail = {
  playlist: Record<string, any>;
  songs: any[];
};

/**
 * 获取歌单详情
 * @returns detail
 */
export default function useDetail() {
  const [searchParams] = useSearchParams();
  const playListId = searchParams.get('id');

  const [detail, setDetail] = useState<Detail>({
    playlist: {},
    songs: [],
  });

  useAsyncEffect(async () => {
    const data = await window.fetchJson(`/playlist/detail?id=${playListId}`);
    const { songs } = await window.fetchJson(`/playlist/track/all?id=${playListId}`);
    setDetail((prev) => ({ ...prev, songs: songs || [], playlist: data.playlist || {} }));
  }, [playListId]);

  return detail;
}
