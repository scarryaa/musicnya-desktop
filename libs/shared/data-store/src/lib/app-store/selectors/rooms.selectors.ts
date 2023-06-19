import { createSelector } from '@ngrx/store';
import {
  browseCategoriesAdapter,
  MusicAPIState,
  roomsAdapter,
} from '../reducers/music-api.reducer';
import { selectMusicAPIState } from './music-api.selectors';

export const selectRooms = createSelector(
  selectMusicAPIState,
  (state: MusicAPIState) => state.rooms
);

export const {
  selectIds: selectRoomIds,
  selectEntities: selectRoomEntities,
  selectAll: selectAllRooms,
  selectTotal: selectTotalRooms,
} = roomsAdapter.getSelectors(selectRooms);
