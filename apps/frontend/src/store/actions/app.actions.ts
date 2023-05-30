import { createAction, props } from '@ngrx/store';

// initialize app and create actions for success and failure
export const initApp = createAction('[App] Init');
export const initAppSuccess = createAction('[App] Init Success');
export const initAppFailure = createAction(
  '[App] Init Failure',
  props<{ error: Error }>()
);

// Check if user is logged in
export const checkForLogins = createAction('[App] Check Logins');
export const checkForLoginsSuccess = createAction(
  '[App] Check Logins Success',
  props<{
    payload: {
      data: { loggedInAppleMusic: boolean; loggedInSpotify: boolean };
    };
  }>()
);
export const checkForLoginsFailure = createAction(
  '[App] Check Logins Failure',
  props<{ payload: { error: Error } }>()
);

// Login Apple Music Actions
export const loginAppleMusic = createAction('[App] Login Apple Music');
export const loginAppleMusicSuccess = createAction(
  '[App] Login Apple Music Success'
);
export const loginAppleMusicFailure = createAction(
  '[App] Login Apple Music Failure',
  props<{ payload: { error: Error } }>()
);

// Logout Apple Music Actions
export const logoutAppleMusic = createAction('[App] Logout APple Music');
export const logoutAppleMusicSuccess = createAction(
  '[App] Logout Apple Music Success'
);
export const logoutAppleMusicFailure = createAction(
  '[App] Logout Apple Music Failure',
  props<{ payload: { error: Error } }>()
);

// Login Spotify Actions
export const loginSpotify = createAction('[App] Login Spotify');
export const loginSpotifySuccess = createAction('[App] Login Spotify Success');
export const loginSpotifyFailure = createAction(
  '[App] Login Spotify Failure',
  props<{ payload: { error: Error } }>()
);

// Logout Spotify Actions
export const logoutSpotify = createAction('[App] Logout Spotify');
export const logoutSpotifySuccess = createAction(
  '[App] Logout Spotify Success'
);
export const logoutSpotifyFailure = createAction(
  '[App] Logout Spotify Failure',
  props<{ payload: { error: Error } }>()
);
