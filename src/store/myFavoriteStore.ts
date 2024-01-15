import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  /**
   * 喜欢的音乐id集合
   */
  musicIds: number[];
  updateMusicIds: (value: number[]) => void;
};

const stateCreator: StateCreator<State> = (set, get) => ({
  musicIds: [],
  updateMusicIds: (value) => set({ musicIds: value }),
});

const myFavoriteStore = create(persist(stateCreator, { name: 'myFavoriteStore' }));

export default myFavoriteStore;
