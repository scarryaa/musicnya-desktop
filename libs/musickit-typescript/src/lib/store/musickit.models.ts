/**
 * Interface for the 'Musickit' data
 */
export interface MusickitEntity {
  id: string | number; // Primary ID
  name: string;
  loaded: boolean;
  volume: number;
  storefront: string;
  queue: Array<MusicKit.MediaItem>;
  history: Array<MusicKit.MediaItem>;
  queuePosition: number;
  shuffleMode: MusicKit.PlayerShuffleMode;
  repeatMode: MusicKit.PlayerRepeatMode;
  currentTrack: MusicKit.MediaItem | null;
  currentTrackArtworkURL: string;
  currentPlaybackTime: number;
  currentPlaybackDuration: number;
  isPlaying: boolean;
  isPreviewMode: boolean;
  autoplayTracks: boolean;
  playbackState: MusicKit.PlaybackStates | null;
  userPlaylists: MusicKit.LibraryPlaylists[];
}
