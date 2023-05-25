import { isArray, isLibraryAlbum, isMediaItem } from '../models/music.guards';
import {
  MediaItem,
  LibraryPlaylist,
  Playlist,
  Album,
  LibraryAlbum,
  Song,
  LibrarySong,
  MediaTypes,
  MKMediaItem,
  MKArtists,
  MKLibrarySongs,
  MKSongs,
  MKMusicVideos,
  MKLibraryPlaylists,
  MKAlbums,
} from '../models/music.types';
import { formatArtworkUrl } from './music-utils';

// Maps MusicKit object(s) to MediaItem object(s)
export const fromMusickit = (
  item: MKMediaItem | MKMediaItem[] | MediaItem[] | MediaItem
):
  | MediaItem[]
  | LibraryPlaylist[]
  | Playlist[]
  | Album[]
  | LibraryAlbum[]
  | Song[]
  | LibrarySong[] => {
  if (!item) {
    return [] as MediaItem[] | LibraryPlaylist[] | Playlist[];
  }

  const array = item && isArray(item) ? item : [item];
  const mapped = array.map((value: MKMediaItem | MediaItem) =>
    determineTypeAndMap(value)
  );

  if (!mapped) {
    throw new Error('Unable to map MusicKit object to MediaItem.');
  }
  return mapped;
};

// Maps a MusicKit object to a MediaItem object depending on its type
export const determineTypeAndMap = (
  item:
    | MediaItem
    | MKMediaItem
    | MKLibrarySongs
    | MKSongs
    | MKMusicVideos
    | MKLibraryPlaylists
):
  | Song
  | LibrarySong
  | MediaItem
  | LibraryAlbum
  | Album
  | LibraryPlaylist
  | Playlist => {
  if (isMediaItem(item)) {
    return item;
  }

  const baseItem: MediaItem = {
    type: item.type.slice(0, -1) as MediaTypes,
    id: item.id as string,
    title: item.attributes?.name,
    duration: 0,
  };

  // Depending on the type of MusicKit object, map to different MediaItem objects
  if (isLibraryAlbum(item)) {
    return {
      ...baseItem,
      artists: item?.relationships.artists.data.map(
        (artist: MKArtists) => artist.attributes?.name
      ),
      artwork: {
        dominantColor: item?.attributes?.artwork.bgColor ?? undefined,
        url: formatArtworkUrl(item?.attributes?.artwork?.url, 400),
      },
    } as LibraryAlbum;
  } else {
    switch (item.type) {
      case 'library-playlists': {
        console.log(item);
        return {
          ...baseItem,
          songs:
            (item?.['songs'] as Song[]) ?? item?.relationships?.tracks?.data,
          artwork: {
            dominantColor: (item['songs'] as Song[])?.[0]?.artwork
              ?.dominantColor,
            url: formatArtworkUrl(
              (item?.['songs'] as Song[])?.[0]?.artwork?.url,
              400
            ),
          },
        } as LibraryPlaylist;
      }
      case 'library-songs': {
        return {
          ...baseItem,
          artists: [item?.attributes?.artistName] as string[],
          album:
            item?.attributes?.albumName ??
            item?.relationships?.albums?.data?.map(
              (album: MKAlbums) => album.attributes?.name
            ),
          artwork: {
            dominantColor:
              item?.relationships?.catalog?.data[0]?.attributes?.artwork
                .bgColor ??
              item?.attributes?.artwork.bgColor ??
              undefined,
            url: formatArtworkUrl(item?.attributes?.artwork?.url, 400),
          },
        } as LibrarySong;
      }
      case 'songs': {
        return {
          ...baseItem,
          artists: item?.relationships?.artists?.data?.map(
            (artist: MKArtists) => artist.attributes?.name
          ),
          artwork: {
            dominantColor: item?.attributes?.artwork.bgColor ?? '',
            url: formatArtworkUrl(item?.attributes?.artwork.url, 400),
          },
        } as Song;
      }
      case 'playlists': {
        return {
          ...baseItem,
          artists: item?.relationships?.curator?.data?.map(
            (artist) => artist.attributes?.name
          ),
          artwork: {
            dominantColor: item?.attributes?.artwork?.bgColor,
            url: formatArtworkUrl(item.attributes?.artwork?.url, 400),
          },
        } as Playlist;
      }
      case 'albums': {
        return {
          ...baseItem,
          artists:
            item?.relationships?.artists?.data?.map(
              (artist: MKArtists) => artist.attributes?.name ?? ''
            ) ?? undefined,
          songs:
            (item?.['songs'] as Song[]) ?? item?.relationships?.tracks?.data,
          artwork: {
            dominantColor: item?.attributes?.artwork.bgColor ?? undefined,
            url: formatArtworkUrl(
              (item?.['songs'] as Song[])?.[0]?.artwork?.url,
              400
            ),
          },
        } as Album;
      }
      default: {
        return baseItem;
      }
    }
  }
};
