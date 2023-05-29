import { EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { SpinnerEntity } from '../../models/spinner.model';
import { SpinnerActions } from '../actions';

export const SPINNER_FEATURE_KEY = 'spinner';

export interface SpinnerState extends EntityState<SpinnerEntity> {
  show: boolean;
}

export interface SpinnerPartialState {
  readonly [SPINNER_FEATURE_KEY]: SpinnerState;
}

const initialState: SpinnerState = {
  show: false,
  ids: [],
  entities: {},
};

export const getSpinnerState =
  createFeatureSelector<SpinnerState>(SPINNER_FEATURE_KEY);

// reducer
export const spinnerReducer = createReducer(
  initialState,
  on(SpinnerActions.showSpinner, (state) => ({
    ...state,
    show: true,
  })),
  on(SpinnerActions.hideSpinner, (state) => ({
    ...state,
    show: false,
  }))
);
