import { Artwork } from './music.types';

/**
 * Enum for the different types of media items
 */
export enum Types {
  Playlist,
  LibraryPlaylist,
  Song,
  LibrarySong,
  MusicVideo,
  Undefined,
}

/**
 * Base class for all media items
 */
export class MediaItem {
  artwork: Artwork;
  title: string;
  artists: string[];
  id: string;
  href: string;
  duration?: number;

  constructor({
    artwork,
    title,
    artists,
    id,
    href,
    duration,
  }: Partial<MediaItem> = {}) {
    this.artwork = artwork || { url: undefined, dominantColor: undefined };
    this.title = title || '';
    this.artists = artists || [];
    this.id = id || '';
    this.href = href || '';
    this.duration = duration;
  }
}

/**
 * Class representing a Playlist, which extends MediaItem and includes an optional list of Song objects.
 */
export class Playlist extends MediaItem {
  tracks?: Array<Song>;

  constructor() {
    super();
    this.tracks = undefined;
  }
}

/**
 * Class representing an Album, which extends MediaItem and includes an optional list of Song objects.
 */
export class Album extends MediaItem {
  tracks?: Array<Song>;

  constructor() {
    super();
    this.tracks = undefined;
  }
}

/**
 * Class representing a LibraryAlbum, which is an Album.
 */
export class LibraryAlbum extends Album {}

/**
 * Class representing a LibraryPlaylist, which is a Playlist.
 */
export class LibraryPlaylist extends Playlist {}

/**
 * Class representing a Song, which is a MediaItem.
 */
export class Song extends MediaItem {
  album?: Album;
}

/**
 * Class representing a LibrarySong, which is a Song.
 */
export class LibrarySong extends Song {}

/**
 * Class representing a MusicVideo, which is a MediaItem.
 */
export class MusicVideo extends MediaItem {}
