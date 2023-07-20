const windowStateManager = require('electron-window-state');
const { app, BrowserWindow, ipcMain, components, utilityProcess } = require('electron');
const contextMenu = require('electron-context-menu');
const serve = require('electron-serve');
const path = require('path');
const { exec } = require('child_process');
const processImport = require('process');

// Listen on a specific host via the HOST environment variable
const host = processImport.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
const corsPort = processImport.env.PORT || 3000;

const cors_proxy = require('cors-anywhere');
cors_proxy
	.createServer({
		originWhitelist: [], // Allow all origins
		methodWhitelist: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
		setHeaders: {
			origin: 'https://music.apple.com',
			'access-control-allow-origin':
				'https://music.apple.com, https://localhost:4200, https://localhost:3000',
			// set recieved headers
			'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
			'access-control-allow-methods': '*',
			'access-control-allow-credentials': 'true',
			'access-control-max-age': '86400'
		}
	})
	.listen(corsPort, host, function () {
		console.log('Running CORS Anywhere on ' + host + ':' + corsPort);
	});

try {
	require('electron-reloader')(module);
} catch (e) {
	console.error(e);
}

if (process.platform === "linux") {
	app.commandLine.appendSwitch("enable-accelerated-mjpeg-decode");
  }

const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 5173;
const dev = !app.isPackaged;
let mainWindow;

function createWindow() {
	let windowState = windowStateManager({
		defaultWidth: 950,
		defaultHeight: 650,
	});

	const mainWindow = new BrowserWindow({
		backgroundColor: 'whitesmoke',
		titleBarStyle: 'hidden',
		autoHideMenuBar: true,
		trafficLightPosition: {
			x: 17,
			y: 32,
		},
		minHeight: 400,
		minWidth: 950,
		frame: false,
		show: false,
		acceptFirstMouse: true,
		center: true,
		roundedCorners: true,
		webPreferences: {
			enableRemoteModule: false,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: true,
			preload: path.join(__dirname, 'preload.cjs'),
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
	});

	windowState.manage(mainWindow);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.on('close', () => {
		windowState.saveState(mainWindow);
	});

	return mainWindow;
}

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

async function createMainWindow() {
	await components.whenReady();
	mainWindow = createWindow();
	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (dev) loadVite(port);
	else serveURL(mainWindow);
}

app.once('ready', createMainWindow);
app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow();
	}
});
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('to-main', (event, count) => {
	return mainWindow.webContents.send('from-main', `next count is ${count + 1}`);
});
