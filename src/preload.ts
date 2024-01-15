import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('ELECTRON', {
  maximize: () => ipcRenderer.invoke('method:maximize'),
  getMaximized: async () => await ipcRenderer.invoke('method:maximized'),
  onMaximize: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.on('event:maximize', callback);
  },
  unmaximize: () => ipcRenderer.invoke('method:unmaximize'),
  minimize: () => ipcRenderer.invoke('method:minimize'),
  close: () => ipcRenderer.invoke('method:close'),
});
