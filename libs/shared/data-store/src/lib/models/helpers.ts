// helper functions
// determine type of media item
export const processMediaType = (type: string, id: string[] | string) => {
  if (id instanceof Array<string>) return 'songs';

  switch (type) {
    case 'albums':
      return 'album';
    case 'artists':
      return 'artist';
    case 'playlists':
      return 'playlist';
    case 'library-playlists':
      return 'playlist';
    case 'songs':
      return 'song';
    default:
      return 'song';
  }
};
