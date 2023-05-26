import { LibraryPlaylists } from '@nyan-inc/core';

/**
 * Interface for the 'Music Entity' data
 */
export interface MusicAPIEntity {
  id: string | number; // Primary ID
  name: string;
  payload: any;
  libraryPlaylists: LibraryPlaylists[];
}
