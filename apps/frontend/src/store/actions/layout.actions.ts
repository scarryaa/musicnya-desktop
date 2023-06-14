import { createAction, props } from '@ngrx/store';

export const openDrawer = createAction('[Layout] Open Drawer');
export const closeDrawer = createAction('[Layout] Close Drawer');

// Set view Actions
export const setView = createAction(
  '[Layout] Set View',
  props<{ payload: { view: 'songs' | 'artists' | 'albums' | 'playlists' } }>()
);
export const setViewSuccess = createAction(
  '[Layout] Set View Success',
  props<{ payload: { view: 'songs' | 'artists' | 'albums' | 'playlists' } }>()
);
export const setSongsView = createAction('[Layout] Set Songs View');
export const setSongsViewSuccess = createAction(
  '[Layout] Set Songs View Success'
);
export const setArtistsView = createAction('[Layout] Set Artists View');
export const setArtistsViewSuccess = createAction(
  '[Layout] Set Artists View Success'
);
export const setAlbumsView = createAction('[Layout] Set Albums View');
export const setAlbumsViewSuccess = createAction(
  '[Layout] Set Albums View Success'
);
export const setPlaylistsView = createAction('[Layout] Set Playlists View');
export const setPlaylistsViewSuccess = createAction(
  '[Layout] Set Playlists View Success'
);

export const setBackgroundColor = createAction('[Layout] Set Background Color');
export const setBackgroundColorSuccess = createAction(
  '[Layout] Set Background Color Success',
  props<{ payload: { color: string } }>()
);
