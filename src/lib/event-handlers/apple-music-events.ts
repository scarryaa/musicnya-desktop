import {
	nowPlayingItem,
	nowPlayingItemDuration,
	nowPlayingItemProgress,
	nowPlayingItemTime,
	playbackState,
	playing,
	repeatMode,
	shuffleMode
} from '../../stores/musickit.store';
import type { MusicKit } from '../types/musickit';

export const addEventHandlers = (player: MusicKit.MusicKitInstance) => {
	player.addEventListener('mediaItemStateDidChange', (event) => {
		nowPlayingItem.set(player.nowPlayingItem);
	});

	player.addEventListener('playbackDurationDidChange', (event) => {
		nowPlayingItemDuration.set(player.currentPlaybackDuration);
	});

	player.addEventListener('playbackProgressDidChange', (event) => {
		nowPlayingItemProgress.set(player.currentPlaybackProgress);
	});

	player.addEventListener('playbackTimeDidChange', (event) => {
		nowPlayingItemTime.set(event.currentPlaybackTime);
	});

	player.addEventListener('playbackStateDidChange', (event) => {
		playbackState.set(event.state);
		if (event.state === 2) {
			playing.set(true);
		} else {
			playing.set(false);
		}
	});

	player.addEventListener('repeatModeDidChange', (event) => {
		repeatMode.set(event.repeatMode);
	});

	player.addEventListener('shuffleModeDidChange', (event) => {
		shuffleMode.set(event.shuffleMode);
	});
};
