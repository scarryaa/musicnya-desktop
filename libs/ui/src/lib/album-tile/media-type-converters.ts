import { MediaPlayInfo, QueueOptions } from './models';

export class MediaUtilities {
  static convertToQueueItem = (playInfo: MediaPlayInfo): QueueOptions => {
    switch (playInfo.type) {
      case 'album':
        return { album: playInfo.id };
      case 'playlist':
        return { playlist: playInfo.id };
      case 'song':
        return { song: playInfo.id };
      case 'songs':
        return { songs: playInfo.childIds };
      case 'station':
        return { station: playInfo.id };
      default:
        return {};
    }
  };
}
