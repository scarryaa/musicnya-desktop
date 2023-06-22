// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
const serve = require("electron-serve");
const ipcMain = require("electron").ipcMain;
const loadURL = serve({ directory: "public" });

let mainWindow;

function isDev() {
  return !app.isPackaged;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 650,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.cjs"),
    },
    icon: path.join(__dirname, "public/favicon.png"),
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    frame: false,
    show: false,
    minHeight: 400,
    minWidth: 900,
    acceptFirstMouse: true,
    center: true,
    roundedCorners: true,
  });

  // This block of code is intended for development purpose only.
  // Delete this entire block of code when you are ready to package the application.
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5173/");
  } else {
    loadURL(mainWindow);
  }

  // Uncomment the following line of code when app is ready to be packaged.
  // loadURL(mainWindow);

  // Open the DevTools and also disable Electron Security Warning.
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});

// ipc communication
ipcMain.on('close-window', async () => {
  mainWindow.close();
});

ipcMain.on('minimize-window', async () => {
  mainWindow.minimize();
});

ipcMain.on('maximize-window', async () => {
  mainWindow.maximize();
});
