import Dexie, { Table, liveQuery } from 'dexie';
import myFavoriteStore from './myFavoriteStore';

class MyDexieIndexedDB extends Dexie {
  /**
   * 正在播放的列表
   */
  playingMusics: Table<Music>;
  /**
   * 喜欢的音乐
   */
  likeMusics: Table<Music>;
  /**
   * 喜欢的评论
   */
  // likeComments: Table<>

  constructor() {
    super('music', { autoOpen: true });
    this.version(1).stores({
      playingMusics: '&id',
      likeMusics: '&id',
    });

    this.subscribeLikeMusics();
  }

  /**
   * 监听数据变化（喜欢的音乐）
   */
  private subscribeLikeMusics() {
    // 监听 喜欢的音乐 数据变化，更新 likeStore、playStore 中的数据
    const likeMusicsObservable = liveQuery(() => this.likeMusics.toArray());
    likeMusicsObservable.subscribe({
      next: (value) => {
        const ids = value.map((item) => item.id);
        myFavoriteStore.setState({ musicIds: ids });
      },
    });
  }
}

const DexieIndexedDB = new MyDexieIndexedDB();
export default DexieIndexedDB;
