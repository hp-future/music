import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import DexieIndexedDB from 'src/store/dexieIndexedDB';
import { notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

type State = {
  /**
   * 正在播放的歌曲
   */
  music: Music | null;
  updateMusic: (value: Music | null) => void;
  /**
   * 是否暂停
   */
  paused: boolean;
  updatePaused: (value?: boolean) => void;
  // /**
  //  * 音量大小
  //  */
  // sound: number;
  // updateSound: (value: number) => void;
  // /**
  //  * 播放列表
  //  */
  // playList: Music[];
  // updatePlayList: (value: Music[]) => void;
  /**
   * 上一首
   */
  prev: () => void;
  /**
   * 下一首
   */
  next: () => void;
  // /**
  //  * 播放列表显隐状态
  //  */
  // playlistVisible: boolean;
  // updatePlaylistVisible: (value?: boolean) => void;
  /**
   * 歌曲详情
   */
  musicDetailVisible: boolean;
  updateMusicDetailVisible: (value?: boolean) => void;
  /**
   * 播放进度
   */
  currentTime: number;
  updateCurrentTime: (value: number) => void;
};

const stateCreator: StateCreator<State> = (set, get) => ({
  currentTime: 0,
  updateCurrentTime: (value) => set({ currentTime: value }),
  musicDetailVisible: false,
  updateMusicDetailVisible: (value) => {
    set((state) => ({ musicDetailVisible: typeof value === 'boolean' ? value : !state.musicDetailVisible }));
  },
  music: null,
  updateMusic: async (value) => {
    set({ paused: true });
    const music = value ? await getSongUrl(value) : value;
    set({ music, paused: !!music.damageMsg });
  },
  paused: true,
  updatePaused: (value) => {
    set((state) => ({ paused: typeof value === 'boolean' ? value : !state.paused }));
  },
  // sound: 50,
  // updateSound: (value) => set({ sound: value }),
  // playList: [],
  // updatePlayList: (value) => set({ playList: value }),
  prev: async () => {
    set({ paused: true });
    const state = get();
    const playingMusics = await DexieIndexedDB.playingMusics.toArray();
    if (playingMusics.length === 0) return {};

    let index = playingMusics.findIndex((item) => item.id === state.music.id);
    index = index === 0 ? playingMusics.length - 1 : index - 1;
    let music = playingMusics[index];
    music = music.url ? music : await getSongUrl(music);
    set({ music, paused: !!music.damageMsg });
  },
  next: async () => {
    set({ paused: true });
    const state = get();
    const playingMusics = await DexieIndexedDB.playingMusics.toArray();
    if (playingMusics.length === 0) return {};

    let index = playingMusics.findIndex((item) => item.id === state.music.id);
    index = index === playingMusics.length - 1 ? 0 : index + 1;
    let music = playingMusics[index];
    music = music.url ? music : await getSongUrl(music);
    set({ music, paused: !!music.damageMsg });
  },
  // playlistVisible: false,
  // updatePlaylistVisible: (value) => {
  //   set((state) => ({ playlistVisible: typeof value === 'boolean' ? value : !state.playlistVisible }));
  // },
});

/**
 * 获取歌曲url
 * @param {Music} music
 * @returns Music
 */
async function getSongUrl(music: Music) {
  try {
    const { data } = await window.fetchJson(`/song/url/v1?level=jymaster&id=${music.id}`);
    music.url = data[0].url;
    music.damageMsg = '';
    await window.fetchJson(`/check/music?id=${music.id}`);
  } catch (error) {
    music.damageMsg = error.message;
  }
  return music;
}

const playingStore = create(persist(stateCreator, { name: 'playingStore' }));

export default playingStore;
