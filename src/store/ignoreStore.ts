import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  /**
   * 歌单播放全部不再提醒
   */
  playListPlayAllIgnore: boolean;
  updatePlayListPlayAllIgnore: (value: boolean) => void;
};

const stateCreator: StateCreator<State> = (set) => ({
  playListPlayAllIgnore: false,
  updatePlayListPlayAllIgnore: (value) => set({ playListPlayAllIgnore: value }),
});

const ignoreStore = create(persist(stateCreator, { name: 'ignoreStore' }));

export default ignoreStore;
