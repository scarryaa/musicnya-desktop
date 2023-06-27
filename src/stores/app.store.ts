import { writable } from 'svelte/store';

// drawer
export const drawerOpen = writable(false);
export const firstLaunch = writable(true);
export const listenLater = writable([]);
export const scrollPosition = {
	home: writable(0)
};
