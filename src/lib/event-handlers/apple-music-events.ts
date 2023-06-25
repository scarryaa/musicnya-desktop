import type { MusicKit } from "../types/musickit";

export const addEventHandlers = (player: MusicKit.MusicKitInstance) => {
    player.addEventListener('playbackStateDidChange', (event) => {
        console.log('playbackStateDidChange', event);
    });
}