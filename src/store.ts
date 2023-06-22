import { writable } from 'svelte/store';

// drawer
export const drawerOpen = writable(false);

// routing
export const history = writable([]);
export const historyIndex = writable(0);

export const firstLaunch = writable(true);
export const libraryPlaylists = writable([]);
export const albums = writable([]);
export const instance = writable({});
export const developerToken = writable('');
export const musicUserToken = writable('');