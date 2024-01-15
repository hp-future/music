import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import playingStore from 'src/store/playingStore';

/**
 * 获取歌词
 */
export default function useGetLyric() {
  const [lyric, setLyric] = useState<{ text: string; time: string }[]>([]);
  const [music] = playingStore((state) => [state.music]);

  useAsyncEffect(async () => {
    if (music) {
      const { lrc } = await window.fetchJson('/lyric?id=' + music.id);
      let arr = lrc.lyric.split('\n');
      arr = arr.map((item: string) => {
        const [time, text] = item.split(/(?<=^\[.*)\]/);

        return {
          time: time.substring(1),
          text: text?.trim(),
        };
      });
      setLyric(arr);
    }
  }, [music]);

  return lyric;
}
