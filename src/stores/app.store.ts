import { writable } from 'svelte/store';

// drawer
export const drawerOpen = writable(false);
export const drawerRightOpen = writable(false);
export const lyricsOpen = writable(false);
export const lyrics = writable('');
export const queueOpen = writable(false);
export const queue = writable([]);
export const loggedIn = writable(false);
export const listenLater = writable([]);
export const scrollPosition: {
	[n: number]: typeof writable;
} = writable({});
export const scrollPositionY = writable(0);
