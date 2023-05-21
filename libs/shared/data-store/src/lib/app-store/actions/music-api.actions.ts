import { createAction, props } from '@ngrx/store';
import { LibraryPlaylist, LibrarySong } from '@nyan-inc/core';
import { MusicKit } from '@nyan-inc/musickit';
import { MusicAPIEntity } from '../models/music-api.models';

export const init = createAction(
  '[Music/API] Init',
  props<{ payload: { config: MusicKit.MusicKitConfiguration } }>()
);
export const initSuccess = createAction('[Music/API] Init Success');
export const initFailure = createAction(
  '[Music/API] Init Failure',
  props<{ payload: { error: Error } }>()
);

export const getLibraryPlaylists = createAction(
  '[Music/API] Get Library Playlists'
);

export const getLibraryPlaylistsSuccess = createAction(
  '[Music/API] Get Library Playlists Success',
  props<{ payload: { data: LibraryPlaylist[] } }>()
);

export const getLibraryPlaylistsFailure = createAction(
  '[Music/API] Get Library Playlists Failure',
  props<{ payload: { error: any } }>()
);

export const getLibraryPlaylistSongs = createAction(
  '[Music/API] Get Library Playlist Songs',
  props<{
    payload: {
      id: number;
    };
  }>()
);
export const getLibraryPlaylistSongsSuccess = createAction(
  '[Music/API] Get Library Playlist Songs Success',
  props<{
    payload: {
      songs: LibrarySong[];
    };
  }>()
);
export const getLibraryPlaylistSongsFailure = createAction(
  '[Music/API] Get Library Playlist Songs Failure',
  props<{ payload: { error: any } }>()
);
