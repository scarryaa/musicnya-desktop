/* eslint-disable functional/prefer-immutable-types */
import { createAction, props } from '@ngrx/store';
import { MusicKit } from '@nyan-inc/shared-types';

export const musicInit = createAction('[Music] Init');

export const setQueue = createAction(
  '[Music] Set Queue',
  props<{ payload: { options: MusicKit.QueueOptions } }>()
);
export const setQueueSuccess = createAction('[Music] Set Queue Success');
export const setQueueFailure = createAction(
  '[Music] Set Queue Failure',
  props<{ payload: { error: Error } }>()
);

export const shufflePlay = createAction(
  '[Music] Shuffle Play',
  props<{ payload: { options: MusicKit.QueueOptions } }>()
);
export const shufflePlaySuccess = createAction('[Music] Shuffle Play Success');
export const shufflePlayFailure = createAction(
  '[Music] Shuffle Play Failure',
  props<{ payload: { error: Error } }>()
);

export const setQueueThenPlay = createAction(
  '[Music] Set Queue Then Play',
  props<{ payload: { options: MusicKit.QueueOptions } }>()
);
export const setQueueThenPlaySuccess = createAction(
  '[Music] Set Queue Then Play Success'
);
export const setQueueThenPlayFailure = createAction(
  '[Music] Set Queue Then Play Failure',
  props<{ payload: { error: Error } }>()
);

export const play = createAction('[Music] Play');
export const playSuccess = createAction('[Music] Play Success');
export const playFailure = createAction(
  '[Music] Play Failure',
  props<{ payload: { error: Error } }>()
);

export const setPlaybackDuration = createAction(
  '[Music] Set Playback Duration',
  props<{ payload: { playbackDuration: number } }>()
);
export const setPlaybackDurationSuccess = createAction(
  '[Music] Set Playback Duration Success'
);
export const setPlaybackDurationFailure = createAction(
  '[Music] Set Playback Duration Failure',
  props<{ payload: { error: Error } }>()
);

export const setPlaybackState = createAction(
  '[Music] Set Playback State',
  props<{ payload: { playbackState: number } }>()
);
export const setPlaybackStateSuccess = createAction(
  '[Music] Set Playback State Success'
);
export const setPlaybackStateFailure = createAction(
  '[Music] Set Playback State Failure',
  props<{ payload: { error: Error } }>()
);

export const setMediaItem = createAction(
  '[Music] Set Media Item',
  props<{ payload: { mediaItem: MusicKit.MediaItem } }>()
);
export const setMediaItemSuccess = createAction(
  '[Music] Set Media Item Success'
);
export const setMediaItemFailure = createAction(
  '[Music] Set Media Item Failure',
  props<{ payload: { error: Error } }>()
);

export const pause = createAction('[Music] Pause');
export const pauseSuccess = createAction('[Music] Pause Success');
export const pauseFailure = createAction(
  '[Music] Pause Failure',
  props<{ payload: { error: Error } }>()
);

export const setVolume = createAction(
  '[Music] Set Volume',
  props<{ payload: { volume: number } }>()
);
export const setVolumeSuccess = createAction('[Music] Set Volume Success');
export const setVolumeFailure = createAction(
  '[Music] Set Volume Failure',
  props<{ payload: { error: Error } }>()
);

export const setRepeatMode = createAction('[Music] Set Repeat Mode');
export const setRepeatModeSuccess = createAction(
  '[Music] Set Repeat Mode Success',
  props<{ payload: { repeatMode: MusicKit.PlayerRepeatMode } }>()
);
export const setRepeatModeFailure = createAction(
  '[Music] Set Repeat Mode Failure',
  props<{ payload: { error: Error } }>()
);

export const setShuffleMode = createAction('[Music] Set Shuffle Mode');
export const setShuffleModeSuccess = createAction(
  '[Music] Set Shuffle Mode Success',
  props<{ payload: { shuffleMode: MusicKit.PlayerShuffleMode } }>()
);
export const setShuffleModeFailure = createAction(
  '[Music] Set Shuffle Mode Failure',
  props<{ payload: { error: Error } }>()
);

export const addEventListener = createAction(
  '[Music] Add Event Listener',
  props<{ payload: { event: string; callback: () => void } }>()
);
export const addEventListenerSuccess = createAction(
  '[Music] Add Event Listener Success'
);
export const addEventListenerFailure = createAction(
  '[Music] Add Event Listener Failure',
  props<{ payload: { error: Error } }>()
);

export const removeEventListener = createAction(
  '[Music] Remove Event Listener',
  props<{ payload: { event: string; callback: () => void } }>()
);
export const removeEventListenerSuccess = createAction(
  '[Music] Remove Event Listener Success'
);
export const removeEventListenerFailure = createAction(
  '[Music] Remove Event Listener Failure',
  props<{ payload: { error: Error } }>()
);

export const skipToNextItem = createAction('[Music] Skip To Next Item');
export const skipToNextItemSuccess = createAction(
  '[Music] Skip To Next Item Success'
);
export const skipToNextItemFailure = createAction(
  '[Music] Skip To Next Item Failure',
  props<{ payload: { error: Error } }>()
);

export const skipToPreviousItem = createAction('[Music] Skip To Previous Item');
export const skipToPreviousItemSuccess = createAction(
  '[Music] Skip To Previous Item Success'
);
export const skipToPreviousItemFailure = createAction(
  '[Music] Skip To Previous Item Failure',
  props<{ payload: { error: Error } }>()
);

export const changeToMediaAtIndex = createAction(
  '[Music] Change To Media At Index',
  props<{ payload: { index: number } }>()
);
export const changeToMediaAtIndexSuccess = createAction(
  '[Music] Change To Media At Index Success'
);
export const changeToMediaAtIndexFailure = createAction(
  '[Music] Change To Media At Index Failure',
  props<{ payload: { error: Error } }>()
);

export const seekToTime = createAction(
  '[Music] Seek To Time',
  props<{ payload: { time: number } }>()
);
export const seekToTimeSuccess = createAction('[Music] Seek To Time Success');
export const seekToTimeFailure = createAction(
  '[Music] Seek To Time Failure',
  props<{ payload: { error: Error } }>()
);

export const setQueuePosition = createAction(
  '[Music] Set Queue Position',
  props<{ payload: { position: number } }>()
);
export const setQueuePositionSuccess = createAction(
  '[Music] Set Queue Position Success'
);
export const setQueuePositionFailure = createAction(
  '[Music] Set Queue Position Failure',
  props<{ payload: { error: Error } }>()
);

export const setQueueFromMediaItems = createAction(
  '[Music] Set Queue Items',
  props<{ payload: { items: MusicKit.MediaItem[] } }>()
);
export const setQueueFromMediaItemsSuccess = createAction(
  '[Music] Set Queue Items Success'
);
export const setQueueFromMediaItemsFailure = createAction(
  '[Music] Set Queue Items Failure',
  props<{ payload: { error: Error } }>()
);

export const setQueueFromSongIDs = createAction(
  '[Music] Set Queue From Song IDs',
  props<{ payload: { ids: string[] } }>()
);
export const setQueueFromSongIDsSuccess = createAction(
  '[Music] Set Queue From Song IDs Success'
);
export const setQueueFromSongIDsFailure = createAction(
  '[Music] Set Queue From Song IDs Failure',
  props<{ payload: { error: Error } }>()
);

export const setPlaybackTime = createAction(
  '[Music] Set Playback Time',
  props<{ payload: { time: number } }>()
);
export const setPlaybackTimeSuccess = createAction(
  '[Music] Set Playback Time Success'
);
export const setPlaybackTimeFailure = createAction(
  '[Music] Set Playback Time Failure',
  props<{ payload: { error: Error } }>()
);

export const getArtistFromSongID = createAction(
  '[Music/API] Get Artist From Song',
  props<{ payload: { songId: string } }>()
);
export const getArtistFromSongIDSuccess = createAction(
  '[Music/API] Get Artist From Song Success',
  props<{ payload: { data: MusicKit.Resource } }>()
);
export const getArtistFromSongIDFailure = createAction(
  '[Music/API] Get Artist From Song Failure',
  props<{ payload: { error: Error } }>()
);
