import { writable, type Writable } from 'svelte/store';
import type { MusicKit } from './lib/types/musickit';

// drawer
export const drawerOpen = writable(false);

// routing
export const history = writable([]);
export const historyIndex = writable(0);

export const firstLaunch = writable(true);
export const libraryPlaylists = writable([] as MusicKit.Playlists[]);
export const albums = writable([] as MusicKit.Albums[]);
export const instance = writable({});
export const developerToken = writable('');
export const musicUserToken = writable('');