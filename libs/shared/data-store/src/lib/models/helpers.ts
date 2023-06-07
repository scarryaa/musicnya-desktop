// helper functions
// determine type of media item
export const processMediaType = (
  type: Readonly<string>,
  id: ReadonlyArray<string> | Readonly<string>
) => {
  if (id instanceof Array<string>) return 'songs';

  switch (type) {
    case 'albums': {
      return 'album';
    }
    case 'artists': {
      return 'artist';
    }
    case 'playlists': {
      return 'playlist';
    }
    case 'library-playlists': {
      return 'playlist';
    }
    case 'songs': {
      return 'song';
    }
    case 'stations': {
      return 'station';
    }
    case 'musicVideo': {
      return 'musicVideo';
    }
    default: {
      return 'song';
    }
  }
};
