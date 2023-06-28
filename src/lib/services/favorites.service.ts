import { get } from 'svelte/store';
import { listenLater } from '../../stores/app.store';
import type { MusicKit } from '../types/musickit';

export const addToListenLater = (
	type: string,
	id: string | string[],
	name: string,
	artwork: string,
	artistName?: string,
	artistId?: string
) => {
	listenLater.update((list) => {
		return [...list, { type, id, name, artwork, artistName, artistId }];
	});

	// write to disk
	console.log(get(listenLater));
	localStorage.setItem('listenLater', JSON.stringify(get(listenLater)));
};

export const removeFromListenLater = (type: string, id: string | string[]) => {
	listenLater.update((list) => {
		return list.filter((item) => item.id !== id);
	});

	localStorage.setItem('listenLater', JSON.stringify(get(listenLater)));
	console.log(get(listenLater));
};

export const inListenLater = (type: string, id: string | string[]) => {
	return get(listenLater).some((item) => item.id === id);
};
