import type { MusicKit } from '../../lib/types/musickit';

export const play = (type: string, id: string | string[], position = 0) => {
	const oldShuffleMode = MusicKit.getInstance().shuffleMode;
	MusicKit.getInstance().shuffleMode = 0;
	MusicKit.getInstance()
		.setQueue({
			[type]: id,
			startPlaying: true,
			startPosition: position
		})
		.finally(() => {
			MusicKit.getInstance().play();
			MusicKit.getInstance().shuffleMode = oldShuffleMode;
		});
};

export const playNext = (type: string, id: string | string[]) => {
	MusicKit.getInstance().playNext({
		[type]: id
	});
};

export const playLater = (type: string, id: string | string[]) => {
	MusicKit.getInstance().playLater({
		[type]: id
	});
};

export const shuffle = (type: string, id: string | string[]) => {
	MusicKit.getInstance().setQueue({ [type]: id, shuffle: true, startPlaying: true });
};
