const { app, BrowserWindow } = require('electron');
const url = require("url");
const path = require("path");
require('electron-reload')(__dirname);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: "#5A578E",
      symbolColor: 'white',
      height: 25
    },
    fullscreenable:false,
    fullscreen: false,
    width: 790,
    height: 615,
    minWidth: 790,
    minHeight: 615,
    webPreferences: {
      nodeIntegration: true
    },
  })

  mainWindow.loadURL('http://localhost:4200');
  //   // Open the DevTools.
  //   mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})