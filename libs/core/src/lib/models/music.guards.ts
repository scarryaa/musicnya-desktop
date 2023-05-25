/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Album,
  LibraryAlbum,
  LibraryPlaylist,
  MediaItem,
  MKAlbums,
  MKArtists,
  MKLibraryAlbums,
  MKLibraryPlaylists,
  MKMusicVideos,
  MKPlaylists,
  MKSongs,
  MKStations,
  MusicVideo,
  Playlist,
  Song,
} from './music.types';

export const isArray = <T>(input: any | any[]): input is any[] =>
  input && (input as Array<T>).constructor === Array;

// check if item is a MediaItem
export const isMediaItem = (
  item: any[] | any
): item is MediaItem | MediaItem[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return isArray(item)
    ? item.every(
        (mediaItem) =>
          mediaItem &&
          mediaItem.id &&
          mediaItem.artists &&
          mediaItem.title &&
          mediaItem.artwork &&
          mediaItem.type.includes(mediaItem.type)
      )
    : item &&
        item.id &&
        item.artists &&
        item.title &&
        item.artwork &&
        item.type.includes(item.type);
};

export const isLibraryAlbum = (item: any): item is LibraryAlbum => {
  return item && item?.['type'] && item?.['type'] === 'library-album';
};

export const isLibraryPlaylist = (item: any): item is LibraryPlaylist => {
  return item && item?.['type'] && item?.['type'] === 'library-playlist';
};

export const isPlaylist = (item: any): item is Playlist => {
  return item && item?.['type'] && item?.['type'] === 'playlist';
};

export const isAlbum = (item: any): item is Album => {
  return item && item?.['type'] && item?.['type'] === 'album';
};

export const isSong = (item: any): item is Song => {
  return item && item?.['type'] && item?.['type'] === 'song';
};

export const isMusicVideo = (item: any): item is MusicVideo => {
  return item && item?.['type'] && item?.['type'] === 'music-video';
};

// export const isArtist = (item: any): item is Artist => {
//   return item && item?.['type'] && item?.['type'] === 'artist';
// };

// export const isStation = (item: any): item is Station => {
//   return item && item?.['type'] && item?.['type'] === 'station';
// };
