import type { MusicKit } from 'src/lib/types/musickit';
import { writable, type Writable } from 'svelte/store';

const enum playbackStates {
	none = 0,
	loading = 1,
	playing = 2,
	paused = 3,
	stopped = 4,
	ended = 5,
	seeking = 6,
	waiting = 7,
	stalled = 8,
	completed = 9
}

export const libraryPlaylists = writable([] as MusicKit.Playlists[]);
export const albums = writable([] as MusicKit.Albums[]);
export const instance = writable({});
export const developerToken = writable('');
export const musicUserToken = writable('');

export const nowPlayingItem: Writable<MusicKit.MediaItem | undefined> = writable(undefined);
export const nowPlayingItemIndex = writable(0);
export const nowPlayingItemDuration = writable(0);
export const nowPlayingItemProgress = writable(0);
export const playbackState = writable(playbackStates.none);
