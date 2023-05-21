import { createAction, props } from '@ngrx/store';
import { PreferencesEntity } from '../models/preferences.models';

export const prefsInit = createAction(
  '[Preferences] Init',
  props<{ payload: {} }>()
);
export const prefsInitSuccess = createAction(
  '[Preferences] Init Success',
  props<{ payload: PreferencesEntity[] }>()
);
export const prefsInitFailure = createAction(
  '[Preferences] Init Failure',
  props<{ payload: { error: Error } }>()
);

export const getPreferences = createAction('[Preferences] Get Preferences');
export const getPreferencesSuccess = createAction(
  '[Preferences] Get Preferences Success'
);
export const getPreferencesFailure = createAction(
  '[Preferences] Get Preferences Failure',
  props<{ payload: { error: Error } }>()
);

export const setPreferences = createAction('[Preferences] Set Preferences');
export const setPreferencesSuccess = createAction(
  '[Preferences] Set Preferences Success'
);
export const setPreferencesFailure = createAction(
  '[Preferences] Set Preferences Failure',
  props<{ payload: { error: Error } }>()
);
