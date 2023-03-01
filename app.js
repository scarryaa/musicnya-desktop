const { app, BrowserWindow, ipcMain, session, components } = require('electron');
if (process.env.NODE_ENV === 'development') { require('electron-reload')(__dirname) }
const path = require('path');
const fs = require('fs');
var currentPlatform = process.platform;

let mainWindow;
app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('allow-insecure-localhost', 'true');

function createWindow() {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    titleBarOverlay: false,
    fullscreenable:false,
    fullscreen: false,
    width: 790,
    height: 615,
    minWidth: 790,
    minHeight: 615,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    },
  })

  mainWindow.on('load', function() {
    const closeButton = document.querySelector('.close-button');
    const minimizeButton = document.querySelector('.minimize-button');
    const maximizeButton = document.querySelector('.maximize-button');
    
    let isMaximized = false;
    
    closeButton.addEventListener('click', () => mainWindow.close());
    minimizeButton.addEventListener('click', () => mainWindow.minimize());
    maximizeButton.addEventListener('click', () => {
        isMaximized = !isMaximized;
        isMaximized ? mainWindow.unmaximize() : mainWindow.maximize();
    });
})

  mainWindow.loadURL('http://localhost:4200');
}

function setMainMenu() {
  const template = [
    {
      label: 'Filter',
      submenu: [
        {
          label: 'Hello',
          accelerator: 'Shift+CmdOrCtrl+H',
          click() {
              console.log('Oh, hi there!')
          }
        }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});

app.on('ready', async () => {
  await components.whenReady();
//   session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
//     callback({ responseHeaders: Object.assign({
//         "Content-Security-Policy": [ "default-src 'self' https://*.apple.com https://xp.apple.com *.itunes.apple.com data:; img-src * data: 'self'; style-src 'self' 'unsafe-inline'; style-src-elem 'self' https://fonts.googleapis.com https://www.apple.com 'unsafe-inline'; font-src https://fonts.gstatic.com https://www.apple.com 'self'; frame-src https://mediaauth.apple.com; script-src 'self' https://mediaauth.apple.com https://xp.apple.com https://js-cdn.music.apple.com 'unsafe-inline';"]
//     }, details.responseHeaders)});
// });

  createWindow();
  setMainMenu();
  
  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
    },
  );
  
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

ipcMain.on("toMain", (event, args) => {
  if (args.command == 'closeWindow') {
    mainWindow.close();
  } else if (args.command == 'maximizeWindow') {
    if (mainWindow.isMaximized()) mainWindow.unmaximize();
    else mainWindow.maximize();
  } else if (args.command == 'minimizeWindow') {
    mainWindow.minimize();
  } 
  
  if (args.command == 'whatPlatform') {
    event.sender.send('fromMain', currentPlatform);
  }

  // user prefs
  if (args.command == 'getUserPrefs') {
    var data = fs.readFileSync(app.getPath('userData') + '/userprefs.json');
    event.sender.send('fromMain', {command: 'getUserPrefs', data: JSON.parse(data)});
  } else if (args.command == 'saveUserPrefs') {
    fs.writeFileSync(app.getPath('userData') + '/userprefs.json', JSON.stringify(args));
  } else if (args.command == 'getUserPrimaryColor') {
    var data = fs.readFileSync(app.getPath('userData') + '/userprefs.json');
    event.sender.send('fromMain', {command: 'getUserPrimaryColor', data: JSON.parse(data)});
  } else if (args.command == 'getUserSecondaryColor') {
    var data = fs.readFileSync(app.getPath('userData') + '/userprefs.json');
    event.sender.send('fromMain', {command: 'getUserSecondaryColor', data: JSON.parse(data)});
  }
});