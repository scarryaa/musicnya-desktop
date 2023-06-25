import { repeatMode, shuffleMode } from '../../stores/musickit.store';
import type { MusicKit } from '../types/musickit';

export const setVolume = (volume: number) => {
	MusicKit.getInstance().volume = volume;
};

export const seekToTime = (time: number) => {
	MusicKit.getInstance().seekToTime(time);
};

export const skipToNextItem = () => {
	MusicKit.getInstance().skipToNextItem();
};

export const skipToPreviousItem = () => {
	MusicKit.getInstance().skipToPreviousItem();
};

export const toggleRepeatMode = () => {
	MusicKit.getInstance().repeatMode = (MusicKit.getInstance().repeatMode + 1) % 3;
	repeatMode.set(MusicKit.getInstance().repeatMode as unknown as number);
};

export const toggleShuffleMode = () => {
	MusicKit.getInstance().shuffleMode === 1
		? (MusicKit.getInstance().shuffleMode = 0)
		: (MusicKit.getInstance().shuffleMode = 1);
	console.log(MusicKit.getInstance().shuffleMode);
	shuffleMode.set(MusicKit.getInstance().shuffleMode);
};

export const togglePlayPause = () => {
	if (MusicKit.getInstance().playbackState === 2) {
		MusicKit.getInstance().pause();
	} else {
		MusicKit.getInstance().play();
	}
};
