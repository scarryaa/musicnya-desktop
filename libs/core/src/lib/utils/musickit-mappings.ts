import { inject, Injector } from '@angular/core';
import { from, map, take } from 'rxjs';
import { MusicKit } from 'types/musickit';
import { ColorService } from '../color/color.service';
import {
  Album,
  LibraryAlbum,
  LibraryPlaylist,
  LibrarySong,
  MediaItem,
  Playlist,
  Song,
} from '../models/music.models';

type MKMediaItem =
  | MusicKit.LibraryAlbums
  | MusicKit.LibraryPlaylists
  | MusicKit.LibrarySongs
  | MusicKit.Albums
  | MusicKit.Playlists
  | MusicKit.Songs;

// Maps MusicKit object(s) to MediaItem object(s)
export const fromMusickit = (
  item: MusicKit.Resource | MusicKit.Resource[] | undefined
):
  | MediaItem[]
  | LibraryPlaylist[]
  | Playlist[]
  | Album[]
  | LibraryAlbum[]
  | Song[]
  | LibrarySong[] => {
  const array = Array.isArray(item) ? item : [item];
  const mapped = array.map((value) => determineTypeAndMap(value!));

  if (!mapped) throw new Error('Unable to map MusicKit object to MediaItem.');

  return mapped;
};

// Maps a MusicKit.Resource object to a MediaItem object depending on its type
export const determineTypeAndMap = (value: MusicKit.Resource) => {
  const base: MediaItem = {
    id: value.id,
    artists: (value as any).attributes?.curatorName ?? [
      value.attributes?.['artistName'],
    ],
    artwork: {
      dominantColor: undefined,
      url: formatArtworkUrl(
        value.attributes?.['artwork']?.url ??
          (value as any).songs?.[0]?.attributes?.artwork?.url ??
          value.relationships?.tracks?.data?.[0]?.attributes?.artwork?.url,
        300
      ),
    },
    duration: value.attributes?.['durationInMillis'],
    title: value.attributes?.['name'] ?? '',
    href: value.href,
  };

  // Depending on the type of MusicKit object, map to different MediaItem objects
  switch (value.type) {
    case 'library-albums':
    case 'albums':
      return <LibraryAlbum>{
        ...base,
        tracks: fromMusickit(
          (value as any).songs ?? value.relationships?.tracks?.data
        ),
      };
    case 'library-playlists':
    case 'playlists':
      return <LibraryPlaylist>{
        ...base,
        artists: (value as any).attributes?.curatorName ??
          (value as any).attributes?.artistName ?? ['Me'],
        tracks: fromMusickit(
          (value as any).songs ?? value.relationships?.tracks?.data
        ),
      };
    case 'library-songs':
    case 'songs':
    default:
      return {
        ...base,
        album: (value as any).attributes?.albumName,
      };
  }
};

// helper function to replace the {w}x{h} in the url with the desired size
export const formatArtworkUrl = (url: string | undefined, size?: number) => {
  if (!url) return undefined;
  return url
    .replace('{w}x{h}', `${size || 64}x${size || 64}`)
    .replace('{f}', 'webp');
};

// helper function to ligtent or darken a color
export const adjustColor = (color: string, amount: number): string => {
  let usePound = false;

  if (color[0] === '#') {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);

  let r = num >> 16;
  let g = (num >> 8) & 0x00ff;
  let b = num & 0x0000ff;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  // Calculate distance to white (255) or black (0)
  let distance = amount > 0 ? 255 - max : min;

  // If the adjustment amount is greater than the distance, cap the adjustment
  if (Math.abs(amount) > distance) {
    amount = distance * (amount > 0 ? 1 : -1);
  }

  r += amount;
  g += amount;
  b += amount;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};
