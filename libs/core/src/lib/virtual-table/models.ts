export interface Song {
  id: number;
  imageSource: string;
  title: string;
  artists: string[];
  album: string;
  duration: number;
}

export const DisplayedColumns = ['#', 'Title', 'Album', 'Duration'];
