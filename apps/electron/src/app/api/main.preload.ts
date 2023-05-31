import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
});

contextBridge.exposeInIsolatedWorld(999, 'api', {
  authWindowReady: () => ipcRenderer.send('auth-window-ready'),
  send: (channel, data) => {
    // whitelist channels
    const validChannels = ['apple-music-login', 'auth-window-done'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, function_) => {
    const validChannels = [
      'fromMain',
      'auth-window-ready',
      'auth-window-done',
      'load-app',
      'auth-window',
      'bing',
      'bong',
      'apple-music-login',
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
      ipcRenderer.on(channel, (event, ...arguments_) =>
        function_(...arguments_)
      );
    }
  },
  cookies: (state) => {
    ipcRenderer.on('recv-cookies', state);
  },
});

contextBridge.exposeInMainWorld('api', {
  authWindowReady: () => ipcRenderer.send('auth-window-ready'),
  send: (channel, data) => {
    // whitelist channels
    const validChannels = [
      'fromMain',
      'recv-cookies',
      'auth-window-ready',
      'auth-window',
      'auth-window-done',
      'apple-music-login',
      'load-app',
      'auth-completed',
      'bing',
      'bong',
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
  receive: (channel, function_) => {
    const validChannels = [
      'fromMain',
      'auth-window-ready',
      'auth-window-done',
      'auth-window',
      'apple-music-login',
      'bing',
      'bong',
      'load-app',
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
      ipcRenderer.on(channel, (event, ...arguments_) =>
        function_(...arguments_)
      );
    }
  },
  cookies: (state) => {
    ipcRenderer.on('recv-cookies', state);
  },
});
