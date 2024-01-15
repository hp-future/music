declare module '*.scss';
declare module '*.svg';
declare module '*.jpg';
declare module '*.png';

interface Window {
  /**
   * 请求ip
   */
  baseUrl: string;
  /**
   * 接口返回json
   * 默认是GET请求
   */
  fetchJson: (input: RequestInfo | URL, init?: RequestInit) => Promise<Record<string, any>>;
  /**
   * 敬请期待
   */
  developing: () => void;
  /**
   * electron api
   */
  ELECTRON: {
    /**
     * 最大化窗口
     */
    maximize: () => void;
    /**
     * 获取最大化结果
     */
    getMaximized: () => Promise<boolean>;
    /**
     * 监听最大化
     * 注意：初始化时也会调用触发一次
     */
    onMaximize: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => void;
    /**
     * 取消最大化
     */
    unmaximize: () => void;
    /**
     * 最小化窗口
     */
    minimize: () => void;
    /**
     * 关闭窗口
     */
    close: () => void;
  };
}

/**
 * 歌曲
 */
interface Music {
  id: number;
  /**
   * 歌名
   */
  name: string;
  /**
   * 时长(毫秒)
   */
  dt: number;
  /**
   * 专辑
   */
  al: {
    id: number;
    name: string;
    picUrl: string;
  };
  /**
   * 作者
   */
  ar: Array<{ id: number; name: string }>;
  /**
   * 歌曲无法播放原因
   */
  damageMsg?: string;
  [x: string]: any;
}
