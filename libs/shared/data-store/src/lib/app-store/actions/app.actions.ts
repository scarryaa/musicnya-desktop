import { createAction, props } from '@ngrx/store';
import { AppEntity } from '../models/app.models';

// initialize app and create actions for success and failure
export const initApp = createAction('[App] Init');
export const initAppSuccess = createAction('[App] Init Success');
export const initAppFailure = createAction(
  '[App] Init Failure',
  props<{ error: Error }>()
);
