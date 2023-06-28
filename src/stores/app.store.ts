import { writable } from 'svelte/store';

// drawer
export const drawerOpen = writable(false);
export const drawerRightOpen = writable(false);
export const firstLaunch = writable(true);
export const listenLater = writable([]);
export const scrollPosition: {
	[n: number]: typeof writable;
} = writable({});
export const scrollPositionY = writable(0);
