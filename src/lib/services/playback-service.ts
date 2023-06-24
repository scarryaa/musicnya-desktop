import type { MusicKit } from "src/lib/types/musickit";

export const play = (trackId) => {
    MusicKit.getInstance().volume = 0.5;
    MusicKit.getInstance().setQueue({ song: trackId, startPlaying: true });
}