import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
});

contextBridge.exposeInMainWorld('api', {
  authWindowReady: () => ipcRenderer.send('auth-window-ready'),
  send: (channel, data) => {
    // whitelist channels
    let validChannels = [
      'fromMain',
      'recv-cookies',
      'auth-window-ready',
      'auth-window',
      'auth-completed',
      'readytobeshown',
      'signedin',
      'closed',
      'close-window',
      'minimize-window',
      'maximize-window',
      'clear-local-storage',
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = [
      'fromMain',
      'auth-window-ready',
      'auth-window',
      'auth-completed',
      'readytobeshown',
      'signedin',
      'closed',
      'recv-cookies',
      'close-window',
      'minimize-window',
      'maximize-window',
      'clear-local-storage',
    ];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  cookies: (state) => {
    ipcRenderer.on('recv-cookies', state);
  },
});
