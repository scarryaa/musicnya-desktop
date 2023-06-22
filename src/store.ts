import { writable } from 'svelte/store';

// drawer
export const drawerOpen = writable(false);

// routing
export const page = writable();
export const activeLink = writable();
export const history = writable([]);
export const historyIndex = writable(0);

export const firstLaunch = writable(true);