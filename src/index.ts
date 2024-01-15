import { app, BrowserWindow, ipcMain, session } from 'electron';
import path from 'path';
import os from 'os';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

// 是否是生产环境
const isProductionMode = process.env.NODE_ENV === 'production';

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 700,
    width: 1000,
    frame: !isProductionMode,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
    },
  });

  mainWindow.setMinimumSize(1000, 700);

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.openDevTools();

  // 监听最大化事件，将最大化状态传递到渲染进程
  mainWindow.on('maximize', () => mainWindow.webContents.send('event:maximize', true));
  mainWindow.on('unmaximize', () => mainWindow.webContents.send('event:maximize', false));
  // 最大化窗口
  ipcMain.handle('method:maximize', () => mainWindow.maximize());
  // 将最大化状态传递到渲染进程
  ipcMain.handle('method:maximized', () => mainWindow.isMaximized());
  // 取消最大化窗口
  ipcMain.handle('method:unmaximize', () => mainWindow.unmaximize());
  // 最小化窗口
  ipcMain.handle('method:minimize', () => {
    mainWindow.minimize();
    return 123;
  });
  // 关闭窗口
  ipcMain.handle('method:close', () => mainWindow.close());
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// csp
app.whenReady().then(async () => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [`connect-src 'self' http://localhost:4000`],
      },
    });
  });
});


// app.whenReady().then(async () => {
//   const reactDevToolsPath = path.join(
//     os.homedir(),
//     `/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.28.5_0`
//   );
  
//   const reduxDevToolsPath = path.join(
//     os.homedir(),
//     `/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/3.1.3_0`
//   );
//   await session.defaultSession.loadExtension(reactDevToolsPath);
//   await session.defaultSession.loadExtension(reduxDevToolsPath);
// });
