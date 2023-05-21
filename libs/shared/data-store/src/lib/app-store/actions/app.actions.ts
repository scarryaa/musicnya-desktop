import { createAction, props } from '@ngrx/store';
import { AppEntity } from '../models/app.models';

export const initApp = createAction('[App Page] Init');

export const loadAppSuccess = createAction('[App/API] Load App Success');

export const loadAppFailure = createAction(
  '[App/API] Load App Failure',
  props<{ error: Error }>()
);
