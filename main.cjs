/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow, components} = require("electron");
const path = require("path");
const ipcMain = require("electron").ipcMain;

let mainWindow;

if (process.platform === "linux") {
  app.commandLine.appendSwitch("enable-accelerated-mjpeg-decode");
  app.commandLine.appendSwitch("enable-accelerated-video");
  app.commandLine.appendSwitch("disable-gpu-driver-bug-workarounds");
  app.commandLine.appendSwitch("ignore-gpu-blacklist");
  app.commandLine.appendSwitch("enable-native-gpu-memory-buffers");
  app.commandLine.appendSwitch("enable-accelerated-video-decode");
  app.commandLine.appendSwitch("enable-gpu-rasterization");
  app.commandLine.appendSwitch("enable-native-gpu-memory-buffers");
  app.commandLine.appendSwitch("enable-oop-rasterization");
  app.commandLine.appendSwitch("in-process-gpu");
  app.commandLine.appendSwitch("enable-features", "Vulkan");
}

function isDev() {
  return !app.isPackaged;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 950,
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
    minWidth: 950,
    acceptFirstMouse: true,
    center: true,
    roundedCorners: true,
  });

  mainWindow.loadURL("http://localhost:5173/");

  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
  if (isDev()) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}

app.on("ready", async () => {
  await components.whenReady();
  createWindow();
});


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
