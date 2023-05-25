import {
  isArray,
  isLibraryAlbum,
  isMediaItem,
  isSong,
} from '../models/music.guards';
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
  MKLibraryAlbums,
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
  switch (item.type) {
    case 'library-playlists': {
      console.log(item);
      return {
        ...baseItem,
        songs: mapSongs(
          (item?.['songs'] as Song[]) ?? item?.relationships?.tracks?.data
        ),
        duration: (item?.['songs'] as Song[])?.reduce(
          (accumulator, song) => accumulator + (song.duration ?? 0),
          0
        ),
        curator: item?.relationships?.catalog?.data[0].attributes?.curatorName,
        artwork: {
          dominantColor:
            item.attributes?.artwork?.url ??
            (item['songs'] as Song[])?.[0]?.artwork?.dominantColor,
          url: formatArtworkUrl(
            item.attributes?.artwork?.url ??
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
        duration: item?.attributes?.durationInMillis,
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
        duration: item?.attributes?.durationInMillis,
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
        curator: item?.attributes?.curatorName,
        artwork: {
          dominantColor: item?.attributes?.artwork?.bgColor,
          url: formatArtworkUrl(item.attributes?.artwork?.url, 400),
        },
      } as Playlist;
    }
    case 'library-albums': {
      return {
        ...baseItem,
        artists:
          item?.relationships?.artists?.data?.map(
            (artist: MKArtists) => artist.attributes?.name ?? ''
          ) ?? undefined,
        songs: mapSongs(item?.['songs'] ?? item?.relationships?.tracks?.data),
        duration: (item?.relationships?.tracks?.data as MKSongs[])?.reduce(
          (accumulator, song) =>
            accumulator + (song.attributes?.durationInMillis ?? 0),
          0
        ),
        artwork: {
          dominantColor: item?.attributes?.artwork.bgColor ?? undefined,
          url: formatArtworkUrl(
            (item?.['songs'] as Song[])?.[0]?.artwork?.url,
            400
          ),
        },
      } as Album;
    }
    case 'albums': {
      return {
        ...baseItem,
        artists: item?.attributes?.artistName,
        songs: mapSongs(
          (item?.['songs'] as MKSongs[]) ?? item?.relationships?.tracks?.data
        ),
        duration: (item?.relationships?.tracks?.data as MKSongs[])?.reduce(
          (accumulator, song) =>
            accumulator + (song.attributes?.durationInMillis ?? 0),
          0
        ),
        genres: item?.attributes?.genreNames,
        artwork: {
          dominantColor: item?.attributes?.artwork.bgColor ?? undefined,
          url: formatArtworkUrl(
            item?.attributes?.artwork?.url ??
              (item?.['songs'] as Song[])?.[0]?.artwork?.url,
            400
          ),
        },
        shortDescription: item.attributes?.editorialNotes?.short,
        description: item.attributes?.editorialNotes?.standard,
        releaseYear: item?.attributes?.releaseDate?.slice(0, 4),
        releaseDate: item?.attributes?.releaseDate,
      } as Album;
    }
    default: {
      return baseItem;
    }
  }
};

const mapSongs = (songs?: MKSongs[] | Song[]): Song[] => {
  console.log(songs);
  if (!songs) {
    return [] as Song[];
  } else if (songs.some((song: MKSongs | Song) => song.type === 'songs')) {
    return songs.map((song) => {
      const mkSong = song as MKSongs;

      return {
        type: 'song',
        id: mkSong.id,
        title: mkSong?.attributes?.name,
        duration: mkSong?.attributes?.durationInMillis ?? 0,
        artists: mkSong?.relationships?.artists.data.map(
          (artist: MKArtists) => artist?.attributes?.name ?? ''
        ),
        album: mkSong?.attributes?.albumName,
        artwork: {
          dominantColor: mkSong.attributes?.artwork.bgColor,
          url: formatArtworkUrl(mkSong.attributes?.artwork.url, 400),
        },
      };
    });
  } else {
    return songs as Song[];
  }
};
