import { Artwork } from './music.types';

export interface MediaItem {
  artwork: Artwork;
  title: string;
  artists: string[];
  id: number;
  href: string;
  duration?: number;
}

export interface Playlist extends MediaItem {
  tracks: Song[];
}

export interface LibraryPlaylist extends Playlist {}

export interface Song extends MediaItem {}

export interface LibrarySong extends Song {}

export interface MusicVideo extends MediaItem {}
