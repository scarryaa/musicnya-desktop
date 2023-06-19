/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Menu, BrowserWindow, shell, screen, components, app } from 'electron';
const ipcMain = require('electron').ipcMain;
const ipcRenderer = require('electron').ipcRenderer;
import { rendererAppName, rendererAppPort } from './constants';
import { environment } from '../environments/environment';
import { format, join } from 'node:path';

app.commandLine.appendSwitch("enable-features", "Vulkan");

export default class App {
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow;
  static splashWindow: Electron.BrowserWindow;
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

    App.mainWindow.webContents.session.webRequest.onBeforeRequest(
      {
        urls: ['https://*/*'],
      },
      (
        details: { url: string | string[] },
        callback: (argument0: {
          redirectURL?: string;
          cancel?: boolean;
        }) => void
      ) => {
        if (details.url.includes('hls.js')) {
          callback({
            redirectURL: `/assets/js/hls.js`,
          });
        } else {
          callback({
            cancel: false,
          });
        }
      }
    );

    App.mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
      async (details, callback) => {
        if (details.url === 'https://buy.itunes.apple.com/account/web/info') {
          details.requestHeaders['sec-fetch-site'] = 'same-site';
          details.requestHeaders['DNT'] = '1';
          const itspod = await App.mainWindow.webContents.executeJavaScript(
            `window.localStorage.getItem("music.ampwebplay.itspod")`
          );
          if (itspod != undefined)
            details.requestHeaders['Cookie'] = `itspod=${itspod}`;
        }
        if (details.url.includes('play.itunes.apple.com')) {
          details.requestHeaders['DNT'] = '1';
          details.requestHeaders['authority'] = 'play.itunes.com';
          details.requestHeaders['origin'] = 'https://beta.music.apple.com';
          details.requestHeaders['referer'] = 'https://beta.music.apple.com';
          details.requestHeaders['sec-fetch-dest'] = 'empty';
          details.requestHeaders['sec-fetch-mode'] = 'cors';
          details.requestHeaders['sec-fetch-site'] = 'same-site';
        }
        if (details.url.includes('apple.com')) {
          details.requestHeaders['DNT'] = '1';
          details.requestHeaders['authority'] = 'amp-api.music.apple.com';
          details.requestHeaders['origin'] = 'https://beta.music.apple.com';
          details.requestHeaders['referer'] = 'https://beta.music.apple.com';
          details.requestHeaders['sec-fetch-dest'] = 'empty';
          details.requestHeaders['sec-fetch-mode'] = 'cors';
          details.requestHeaders['sec-fetch-site'] = 'same-site';
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
        if (details.url.startsWith('https://amp-api.music.apple.com')) {
          details.requestHeaders['authority'] = 'amp-api.music.apple.com';
          details.requestHeaders['origin'] = 'https://beta.music.apple.com';
          details.requestHeaders['referer'] = 'https://beta.music.apple.com';
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
        } else if (details.url.includes('play.itunes.apple.com')) {
          details.responseHeaders['access-control-allow-origin'].pop();
          details.responseHeaders['access-control-allow-origin'].push(
            App.baseUrl
          );
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

  private static async onReady() {
    await components.whenReady();
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.

    if (rendererAppName) {
      App.initMainWindow();
      App.loadMainWindow();
      App.setHeadersConfig();
      // if (!App.isDevelopmentMode()) {
      //   App.SplashWindow();
      // }
    } else {
      App.application.quit();
    }

    App.application.setName(rendererAppName);
    if (App.isDevelopmentMode()) {
      App.mainWindow.webContents.openDevTools();
    }
    App.SplashWindow();
    App.splashWindow.webContents.openDevTools();
  }

  private static onActivate() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (App.mainWindow === null) {
      App.onReady();
    }
  }

  private static SplashWindow() {
    App.splashWindow = new BrowserWindow({
      width: 450,
      height: 800,
      frame: false,
      transparent: false,
      alwaysOnTop: true,
      resizable: false,
      show: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(__dirname, 'main.preload.js'),
      },
    });

    App.splashWindow.loadURL(`file://${__dirname}/app/splash/splash.html`);
    App.splashWindow.center();
    localStorage.clear();

    const seenSplash = App.splashWindow.webContents.executeJavaScript(
      'localStorage.getItem("seenSplash")'
    );
    console.log(seenSplash);
    if (seenSplash) {
      App.splashWindow.close();
      App.mainWindow.show();
      return;
    }
  }

  private static initMainWindow() {
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
    const width = Math.min(900, workAreaSize.width || 1280);
    const height = Math.min(700, workAreaSize.height || 720);

    // Create the browser window.
    App.mainWindow = new BrowserWindow({
      width: width,
      height: height,
      minWidth: 900,
      minHeight: 700,
      show: false,
      frame: false,
      fullscreenable: true,
      fullscreen: false,
      vibrancy: 'appearance-based',
      visualEffectState: 'active',
      webPreferences: {
        autoplayPolicy: 'no-user-gesture-required',
        scrollBounce: true,
        sandbox: false,
        accessibleTitle: 'musicnya',
        defaultFontFamily: { standard: 'Haskoy', sansSerif: 'InterDisplay' },
        devTools: true,
        experimentalFeatures: App.isDevelopmentMode(),
        nodeIntegration: true,
        contextIsolation: true,
        backgroundThrottling: true,
        preload: join(__dirname, 'main.preload.js'),
      },
    });
    App.mainWindow.setMenu(App.menu);
    App.mainWindow.center();

    
    // if main window is ready to show, close the splash window and show the main window

    ipcMain.on('apple-music-login', () => {
      AuthWindow(App.mainWindow);
    });

    ipcMain.on('close-window', async () => {
      App.mainWindow.close();
    });

    ipcMain.on('minimize-window', async () => {
      App.mainWindow.minimize();
    });

    ipcMain.on('maximize-window', async () => {
      App.mainWindow.maximize();
    });

    ipcMain.on('clear-local-storage', async () => {
      App.mainWindow.webContents.session.clearStorageData();
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
          name: App.isDevelopmentMode()
            ? join(__dirname, '..', 'frontend', 'index.html')
            : join(__dirname, '..', 'frontend', 'browser', 'index.html'),
        })
      );
    } else {
      App.mainWindow.loadURL(
        format({
          name: join(__dirname, '..', rendererAppName, 'index.html'),
        })
      );
    }
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for

    App.BrowserWindow = browserWindow;
    App.application = app;

    App.application.commandLine.appendSwitch(
      'autoplay-policy',
      'no-user-gesture-required'
    );
    App.application.on('window-all-closed', App.onWindowAllClosed); // Quit when all windows are closed.
    App.application.on('ready', App.onReady); // App is ready to load data
    App.application.on('activate', App.onActivate); // App is activated
  }
}

export function AuthWindow(win: BrowserWindow) {
  // create a BrowserWindow
  const authWindow = new BrowserWindow({
    width: 500,
    height: 600,
    show: false,
    titleBarOverlay: {
      color: '#1d1d1f',
      symbolColor: '#ffffff',
    },
    titleBarStyle: 'hidden',
    darkTheme: true,
    resizable: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      allowRunningInsecureContent: true,
      webSecurity: false,
      preload: join(__dirname, 'main.preload.js'),
      nodeIntegrationInWorker: false,
      experimentalFeatures: true,
    },
  });
  // set user agent
  authWindow.webContents.setUserAgent(
    `Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15`
  );

  // show the window
  authWindow.loadURL('https://beta.music.apple.com/');
  const cookieKeys = [
    'itspod',
    'pltvcid',
    'pldfltcid',
    'itua',
    'media-user-token',
    'acn1',
    'dslang',
  ];

  ipcMain.on('auth-window-ready', async () => {
    authWindow.show();
  });

  ipcMain.on('auth-completed', async () => {
    await getCookies().then((cookies) => {
      console.log(cookies);
      win.webContents.send('recv-cookies', cookies);
      win.webContents.send('load-app');
      App.splashWindow.close();
      authWindow.close();

      App.mainWindow.show();
    });
  });

  const overlayStyling = `
.hehehe {
  position: fixed;
  top:0;
  left:0;
  width: 100px;
  height: 100px;
  background: #1d1d1f;
  z-index: 99999;
}
.titlebar {
  height: 30px;
  position: fixed;
  top:0;
  left:0;
  right:0;
  -webkit-app-region: drag;
  z-index: 99999;
}`;

  authWindow.webContents.executeJavaScript(`
  if (window.document.cookie) {
    console.log(window.document.cookie.split(';'));
    window.api.send('auth-completed');
  }
  let tOut = setInterval(async ()=>{
    try {
      if(typeof MusicKit === 'undefined') return;
      MusicKit.getInstance().addEventListener(MusicKit.Events.authorizationStatusDidChange, ()=>{
        if(MusicKit.getInstance().isAuthorized) {
          window.api.send('auth-completed')
        }
      })
      clearInterval(tOut)
    }catch(e) {
      console.log(e);
    }
  }, 500)
let tOut2 = setInterval(()=>{
  try {
    const el = document.querySelector('.signin');
    if(el) {
      el.click();
      window.api.send('auth-window-ready');
      window.session.defaultSession.cookies.get({})
      .then((cookies) => {
        console.log(cookies)
      }).catch((error) => {
        console.log(error)
      })
      clearInterval(tOut2);
    }
  }catch(e) {
    console.log(window.document.cookie.split(';'));
    console.log(window.cookieStore);
    console.log(e);
  }
}, 500)
let styling = \`${overlayStyling}\`;
(()=>{
  const titleBarEl = document.createElement('div')
  const overlayEl = document.createElement('div')
  titleBarEl.classList.add('titlebar')
  overlayEl.classList.add('hehehe')
  const styleTag = document.createElement('style')
  styleTag.innerHTML = styling
  document.head.appendChild(styleTag)
  document.body.appendChild(overlayEl)
  document.body.appendChild(titleBarEl)
})()
`);

  async function getCookies(): Promise<{ [key: string]: string }> {
    return new Promise((res, rej) => {
      authWindow.webContents.session.cookies
        .get({})
        .then((cookies) => {
          console.log('from app:', cookies);
          // for each cookie
          const toRenderer: {
            [key: string]: string;
          } = {};
          for (const key of cookieKeys) {
            // find the cookie
            const cookie = cookies.find((cookie) => cookie.name === key);
            // if cookie exists
            if (cookie) {
              toRenderer[`music.ampwebplay.${cookie.name}`] = cookie.value;
            }
          }
          res(toRenderer);
        })
        .catch((error) => {
          console.log(error);
          rej();
        });
    });
  }
}
