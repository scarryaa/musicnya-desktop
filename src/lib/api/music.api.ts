import { repeatMode, shuffleMode } from '../../stores/musickit.store';
import type { MusicKit } from '../types/musickit';

const checkForMusicKit = () => {
	if (!MusicKit.getInstance()) {
		return;
	}
};

export const waitForMusicKit = () => {
	return new Promise((resolve) => {
		const interval = setInterval(() => {
			if (MusicKit.getInstance()) {
				clearInterval(interval);
				resolve(true);
			}
		}, 100);
	});
};

export const initMusicKit = (instance) => {
	checkForMusicKit();
	MusicKit.getInstance().volume = 0.2;
};

export const setVolume = (volume: number) => {
	checkForMusicKit();
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
