// helper functions
// determine type of media item
export const processMediaType = (type: Readonly<string>, id: string) => {
  switch (type) {
    case 'albums': {
      return 'album';
    }
    case 'library-albums': {
      return 'album';
    }
    case 'library-artists': {
      return 'artist';
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
