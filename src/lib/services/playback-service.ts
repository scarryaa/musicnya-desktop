import type { MusicKit } from "src/lib/types/musickit";

export const play = (type: string, id: string | string[]) => {
    MusicKit.getInstance().volume = 0.5;
    MusicKit.getInstance().setQueue({ [type]: id, startPlaying: true });
}

export const shuffle = (type: string, id: string | string[]) => {
    MusicKit.getInstance().volume = 0.5;
    MusicKit.getInstance().setQueue({ [type]: id, shuffle: true, startPlaying: true });
}