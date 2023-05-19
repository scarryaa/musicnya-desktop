/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { BrowserWindow, shell, screen, Menu } from 'electron';
import { rendererAppName, rendererAppPort } from './constants';
import { environment } from '../environments/environment';
import { format, join } from 'node:path';

export default class App {
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow;
  static platform = process.platform;
  static baseUrl = `http://localhost:${rendererAppPort}`;

  static menuTemplate = [
    {
      label: 'Filter',
      submenu: [
        {
          label: 'Hello',
          accelerator: 'Shift+CmdOrCtrl+H',
          click() {
            console.log('Oh, hi there!');
          },
        },
      ],
    },
  ];
  static menu = Menu.buildFromTemplate(App.menuTemplate);

  public static isDevelopmentMode() {
    const isEnvironmentSet: boolean = 'ELECTRON_IS_DEV' in process.env;
    const getFromEnvironment: boolean =
      Number.parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;

    return isEnvironmentSet ? getFromEnvironment : !environment.production;
  }

  private static setHeadersConfig() {
    App.mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
      async (details, callback) => {
        details.requestHeaders['sec-fetch-site'] = 'same-site';
        details.requestHeaders['DNT'] = '1';

        if (details.url === 'https://buy.itunes.apple.com/account/web/info') {
          details.requestHeaders['Access-Control-Request-Headers'] =
            'media-user-token';
          const itspod = (await App.mainWindow.webContents.executeJavaScript(
            `window.localStorage.getItem("music.ampwebplay.itspod")`
          )) as string;
          if (itspod != undefined) {
            details.requestHeaders['Cookie'] = `itspod=${itspod}`;
          }
        } else if (details.url.includes('apple.com')) {
          details.requestHeaders['authority'] = 'amp-api.music.apple.com';
          details.requestHeaders['origin'] = 'https://beta.music.apple.com';
          details.requestHeaders['referer'] = 'https://beta.music.apple.com';
        }

        if (details.url.startsWith('https://music.163.com')) {
          details.requestHeaders['Referer'] = 'https://music.163.com/';
          details.requestHeaders['user-agent'] =
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) musicnya/1.0.0 Chrome/96.0.4664.45 Electron/16.0.0 Safari/537.36';
        }

        if (details.url.includes('https://qq.com')) {
          (details.requestHeaders['Accept'] = '*/*'),
            (details.requestHeaders['Accept-Encoding'] = 'gzip, deflate, br'),
            (details.requestHeaders['Accept-Language'] =
              'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6'),
            (details.requestHeaders['Referer'] = 'https://y.qq.com/'),
            (details.requestHeaders['User-Agent'] =
              'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (');
          ('KHTML, like Gecko) Mobile/17D50 UCBrowser/12.8.2.1268 Mobile AliApp(TUnionSDK/0.1.20.3) ');
        }

        if (
          details.url.includes(
            'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
          )
        ) {
          (details.requestHeaders['Accept'] = '*/*'),
            (details.requestHeaders['Accept-Encoding'] = 'gzip, deflate, br'),
            (details.requestHeaders['Accept-Language'] =
              'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6'),
            (details.requestHeaders['User-Agent'] =
              'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (');
          ('KHTML, like Gecko) Mobile/17D50 UCBrowser/12.8.2.1268 Mobile AliApp(TUnionSDK/0.1.20.3) ');
          details.requestHeaders['Referer'] =
            'https://y.qq.com/portal/player.html';
        }
        callback({ requestHeaders: details.requestHeaders });
      }
    );

    App.mainWindow.webContents.session.webRequest.onHeadersReceived(
      // eslint-disable-next-line @typescript-eslint/require-await
      async (details, callback) => {
        if (details.url.includes('buy.itunes.apple.com')) {
          details.responseHeaders['Referrer-Policy'] = ['no-referrer'];
          details.responseHeaders['sec-fetch-mode'] = ['no-cors'];
          details.responseHeaders['mode'] = ['no-cors'];
          details.responseHeaders['withCredentials'] = ['true'];
          details.responseHeaders['Access-Control-Allow-Credentials'] = [
            'true',
          ];
          details.responseHeaders['Access-Control-Allow-Headers'] = [
            'media-user-token',
            'authorization',
            'music-user-token',
          ];
          details.responseHeaders['Access-Control-Allow-Origin'] = [
            App.baseUrl,
          ];
        } else if (details.url.includes('music.apple.com')) {
          details.responseHeaders['access-control-allow-origin'] = [
            App.baseUrl,
          ];
          details.responseHeaders['referer'] = ['https://beta.music.apple.com'];
        }

        callback({ responseHeaders: details.responseHeaders });
      }
    );
  }

  private static onWindowAllClosed() {
    if (App.platform !== 'darwin') {
      App.application.quit();
    }
  }

  private static onClose() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    App.mainWindow = undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static onRedirect(event: any, url: string) {
    if (url !== App.mainWindow.webContents.getURL()) {
      // this is a normal external redirect, open it in a new browser window
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      event.preventDefault();
      shell.openExternal(url);
    }
  }

  private static onReady() {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.

    if (rendererAppName) {
      App.initMainWindow();
      App.loadMainWindow();
      if (App.isDevelopmentMode()) {
        App.mainWindow.webContents.openDevTools();
      }
      App.setHeadersConfig();
    }
  }

  private static onActivate() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (App.mainWindow === null) {
      App.onReady();
    }
  }

  private static initMainWindow() {
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
    const width = Math.min(900, workAreaSize.width || 1280);
    const height = Math.min(615, workAreaSize.height || 720);

    // Create the browser window.
    App.mainWindow = new BrowserWindow({
      width: width,
      height: height,
      minWidth: 900,
      minHeight: 615,
      show: false,
      frame: false,
      fullscreenable: true,
      fullscreen: false,
      vibrancy: 'appearance-based',
      visualEffectState: 'active',
      webPreferences: {
        autoplayPolicy: 'no-user-gesture-required',
        scrollBounce: true,
        sandbox: true,
        accessibleTitle: 'musicnya',
        defaultFontFamily: { standard: 'Haskoy', sansSerif: 'InterDisplay' },
        devTools: App.isDevelopmentMode(),
        experimentalFeatures: App.isDevelopmentMode(),
        nodeIntegration: false,
        contextIsolation: true,
        backgroundThrottling: true,
        preload: join(__dirname, 'main.preload.js'),
      },
    });
    App.mainWindow.setMenu(App.menu);
    App.mainWindow.center();

    // if main window is ready to show, close the splash window and show the main window
    App.mainWindow.once('ready-to-show', () => {
      App.mainWindow.show();
    });

    // handle all external redirects in a new browser window
    // App.mainWindow.webContents.on('will-navigate', App.onRedirect);
    // App.mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
    //     App.onRedirect(event, url);
    // });

    // Emitted when the window is closed.
    App.mainWindow.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      App.mainWindow = undefined;
    });
  }

  private static loadMainWindow() {
    // load the index.html of the app.
    if (App.application.isPackaged) {
      App.mainWindow.loadURL(
        format({
          pathname: join(__dirname, '..', rendererAppName, 'index.html'),
          protocol: 'file:',
          slashes: true,
        })
      );
    } else {
      App.mainWindow.loadURL(App.baseUrl);
    }
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for

    App.BrowserWindow = browserWindow;
    App.application = app;

    App.application.on('window-all-closed', App.onWindowAllClosed); // Quit when all windows are closed.
    App.application.on('ready', App.onReady); // App is ready to load data
    App.application.on('activate', App.onActivate); // App is activated
  }
}
