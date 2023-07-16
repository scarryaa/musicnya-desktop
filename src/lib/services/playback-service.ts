export const play = (type: string, id: string | string[], position = 0) => {
	if (MusicKit.getInstance().playbackState === 2) {
		MusicKit.getInstance().pause();
	}

	const oldShuffleMode = MusicKit.getInstance().shuffleMode;
	MusicKit.getInstance().shuffleMode = 0;
	MusicKit.getInstance()
		.setQueue({
			[type]: id,
			startPlaying: false,
			startWith: position
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
