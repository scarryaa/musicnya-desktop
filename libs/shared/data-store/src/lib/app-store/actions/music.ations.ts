import { createAction, props } from '@ngrx/store';
import { MusicKit } from '@nyan-inc/musickit';
import { MusicEntity } from '../models/music.models';

export const setQueue = createAction(
  '[Music] Set Queue',
  props<{ payload: { options: MusicKit.QueueOptions } }>()
);
export const setQueueSuccess = createAction('[Music] Set Queue Success');
export const setQueueFailure = createAction('[Music] Set Queue Failure');

export const play = createAction('[Music] Play');
export const pause = createAction('[Music] Pause');
export const previousTrack = createAction('[Music] Next Track');
export const nextTrack = createAction('[Music] Previous Track');
