import { MusicKit } from 'types/musickit';

export type Artwork = {
  url?: string;
  dominantColor?: string;
};

/**
 * Class representing a Playlist, which extends MediaItem and includes an optional list of Song objects.
 */
export type Playlist = MediaItem & {
  songs?: Array<Song>;
};

/**
 * Class representing an Album, which extends MediaItem and includes an optional list of Song objects.
 */
export type Album = MediaItem & {
  songs?: Array<Song>;
  genres?: Array<string>;
  releaseDate?: string;
  releaseYear?: string;
};

/**
 * Class representing a LibraryAlbum, which is an Album.
 */
export type LibraryAlbum = Album & {};

/**
 * Class representing a LibraryPlaylist, which is a Playlist.
 */
export type LibraryPlaylist = Playlist & {};

/**
 * Class representing a Song, which is a MediaItem.
 */
export type Song = MediaItem & {
  album?: string;
};

/**
 * Class representing a LibrarySong, which is a Song.
 */
export type LibrarySong = Song & {};

/**
 * Class representing a MusicVideo, which is a MediaItem.
 */
export type MusicVideo = MediaItem & {};

export type MediaTypes =
  | 'song'
  | 'album'
  | 'playlist'
  | 'artist'
  | 'station'
  | 'music-video'
  | 'library-playlist'
  | 'library-album';

/**
 * Enum for the different types of media items
 */

/**
 * Base class for all media items
 */
export type MediaItem = {
  artwork?: Artwork;
  title?: string;
  artists?: string[];
  id: string;
  href?: string;
  duration?: number;
  type: MediaTypes;
  songs?: Song[];
};

export type MKMediaItem =
  | MusicKit.LibraryAlbums
  | MusicKit.LibraryPlaylists
  | MusicKit.LibrarySongs
  | MusicKit.Albums
  | MusicKit.Playlists
  | MusicKit.Songs;

export type MKLibraryAlbums = MusicKit.LibraryAlbums;
export type MKLibraryPlaylists = MusicKit.LibraryPlaylists;
export type MKLibrarySongs = MusicKit.LibrarySongs;
export type MKAlbums = MusicKit.Albums;
export type MKPlaylists = MusicKit.Playlists;
export type MKSongs = MusicKit.Songs;
export type MKMusicVideos = MusicKit.MusicVideos;
export type MKStations = MusicKit.Stations;
export type MKArtists = MusicKit.Artists;
export type MKCurators = MusicKit.Curators;
export type MKActivities = MusicKit.Activities;
export type MKAppleCurators = MusicKit.AppleCurators;
