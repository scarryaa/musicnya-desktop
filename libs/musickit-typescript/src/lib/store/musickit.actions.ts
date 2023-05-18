import { createAction, props, union } from '@ngrx/store';
import { MusickitEntity } from './musickit.models';

export const initMusickit = createAction(
  '[Musickit Page] Init',
  props<{ payload: { config: MusicKit.MusicKitConfiguration } }>()
);

export const loadMusickitSuccess = createAction(
  '[Musickit/API] Load Musickit Success'
);

export const loadMusickitFailure = createAction(
  '[Musickit/API] Load Musickit Failure',
  props<{ payload: { error: any } }>()
);

export const addEventListener = createAction(
  '[MusicKit/API] Add Event Listener',
  props<{ payload: { listener: any } }>()
);

export const addEventListenerSuccess = createAction(
  '[Musickit/API] Add Event Listener Success'
);

export const addEventListenerFailure = createAction(
  '[Musickit/API] Add Event Listener Failure',
  props<{ payload: { error: any } }>()
);

export const play = createAction('[MusicKit/API] Play');

export const playSuccess = createAction('[Musickit/API] Play Success');

export const playFailure = createAction(
  '[Musickit/API] Play Failure',
  props<{ payload: { error: any } }>()
);

export const setQueue = createAction(
  '[MusicKit/API] Set Queue',
  props<{
    payload: {
      options: MusicKit.QueueOptions;
    };
  }>()
);

export const setQueueSuccess = createAction('[Musickit/API] Set Queue Success');

export const setQueueFailure = createAction(
  '[Musickit/API] Set Queue Failure',
  props<{ payload: { error: any } }>()
);

const all = union({
  initMusickit,
  loadMusickitSuccess,
  loadMusickitFailure,
  addEventListener,
  addEventListenerFailure,
  addEventListenerSuccess,
  play,
  playSuccess,
  playFailure,
  setQueue,
  setQueueSuccess,
  setQueueFailure,
});
export type MusickitActions = typeof all;
