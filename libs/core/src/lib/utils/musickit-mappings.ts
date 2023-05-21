import { MediaItem, Song } from '../models/music.models';
import { MusicKit } from '@nyan-inc/musickit';

export const fromMusickit = (
  item: MusicKit.Resource | MusicKit.Resource[] | undefined
): MediaItem[] => {
  const array = Array.prototype.concat(item);
  const mapped = array.map((value) => determineTypeAndMap(value)!);
  return mapped;
};

type MKMediaItem =
  | MusicKit.LibraryAlbums
  | MusicKit.LibraryPlaylists
  | MusicKit.LibrarySongs
  | MusicKit.Albums
  | MusicKit.Playlists
  | MusicKit.Songs;

export const determineTypeAndMap = (
  value: MusicKit.Resource
): MediaItem | undefined => {
  switch (value.type) {
    case 'library-albums':
      return <MediaItem>{
        id: parseInt(value.id),
        artists: [value.attributes?.['artistName']],
        artwork: {
          dominantColor: undefined,
          url: value.attributes?.['artwork']?.url,
        },
        duration: undefined,
        title: value.attributes?.['name'],
        href: value.href,
      };
    case 'library-playlists':
      return <MediaItem>{
        id: parseInt(value.id),
        artists: [value.attributes?.['artistName']],
        artwork: {
          dominantColor: undefined,
          url: value.attributes?.['artwork']?.url,
        },
        duration: undefined,
        title: value.attributes?.['name'],
        href: value.href,
      };
    case 'library-songs':
      return <MediaItem>{
        id: parseInt(value.id),
        artists: [value.attributes?.['artistName']],
        artwork: {
          dominantColor: undefined,
          url: value.attributes?.['artwork']?.url,
        },
        duration: undefined,
        title: value.attributes?.['name'],
        href: value.href,
      };
    case 'albums':
      return <MediaItem>{
        id: parseInt(value.id),
        artists: [value.attributes?.['artistName']],
        artwork: {
          dominantColor: undefined,
          url: value.attributes?.['artwork']?.url,
        },
        duration: undefined,
        title: value.attributes?.['name'],
        href: value.href,
      };
    case 'playlists':
      return <MediaItem>{
        id: parseInt(value.id),
        artists: [value.attributes?.['curatorName']],
        artwork: {
          dominantColor: undefined,
          url: value.attributes?.['artwork']?.url,
        },
        duration: undefined,
        title: value.attributes?.['name'],
        href: value.href,
      };
    case 'songs':
      return <MediaItem>{
        id: parseInt(value.id),
        artists: [value.attributes?.['artistName']],
        artwork: {
          dominantColor: undefined,
          url: value.attributes?.['artwork']?.url,
        },
        duration: undefined,
        title: value.attributes?.['name'],
        href: value.href,
      };
    default:
      return undefined;
  }
};
