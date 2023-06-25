import { nowPlayingItem } from 'src/stores/musickit.store';
import type { MusicKit } from '../types/musickit';

export const addEventHandlers = (player: MusicKit.MusicKitInstance) => {
	player.addEventListener('playbackStateDidChange', (event) => {
		nowPlayingItem.set(player.nowPlayingItem);
	});
};
