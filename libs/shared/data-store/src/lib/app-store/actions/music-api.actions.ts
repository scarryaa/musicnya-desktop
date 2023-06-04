import { createAction, props } from '@ngrx/store';
import { MediaItemTypes } from '@nyan-inc/core';
import { MusicKit } from '../../../types';
import { MusicAPIEntity } from '../models/music-api.models';

// Music API Actions
export const loadMusicAPI = createAction('[Music/API] Load Music API');
export const loadMusicAPISuccess = createAction(
  '[Music/API] Load Music API Success'
);
export const loadMusicAPIFailure = createAction(
  '[Music/API] Load Music API Failure',
  props<{ payload: { error: Error } }>()
);

// Library Playlists Actions
export const getLibraryPlaylists = createAction(
  '[Music/API] Get Library Playlists'
);
export const getLibraryPlaylistsSuccess = createAction(
  '[Music/API] Get Library Playlists Success',
  props<{ payload: { data: MusicKit.LibraryPlaylists[] } }>()
);
export const getLibraryPlaylistsFailure = createAction(
  '[Music/API] Get Library Playlists Failure',
  props<{ payload: { error: Error } }>()
);

// Library Albums Actions
export const getLibraryAlbums = createAction(
  '[Music/API] Get Library Albums',
  props<{ payload: { albumId: string } }>()
);
export const getLibraryAlbumsSuccess = createAction(
  '[Music/API] Get Library Albums Success',
  props<{ payload: { data: MusicKit.LibraryAlbums[] } }>()
);
export const getLibraryAlbumsFailure = createAction(
  '[Music/API] Get Library Albums Failure',
  props<{ payload: { error: Error } }>()
);

// Library Playlist Songs Actions
export const getLibraryPlaylistSongs = createAction(
  '[Music/API] Get Library Playlist Songs',
  props<{ payload: { playlist: MusicKit.LibraryPlaylists } }>()
);
export const getLibraryPlaylistSongsSuccess = createAction(
  '[Music/API] Get Library Playlist Songs Success',
  props<{
    payload: {
      playlist: MusicKit.LibraryPlaylists;
      songs: MusicKit.LibrarySongs[];
    };
  }>()
);
export const getLibraryPlaylistSongsFailure = createAction(
  '[Music/API] Get Library Playlist Songs Failure',
  props<{ payload: { error: Error } }>()
);

// Library Album Songs Actions
export const getLibraryAlbumSongs = createAction(
  '[Music/API] Get Library Album Songs',
  props<{ payload: { playlists: MusicKit.LibraryAlbums[] } }>()
);
export const getLibraryAlbumSongsSuccess = createAction(
  '[Music/API] Get Library Album Songs Success',
  props<{ payload: { playlists: MusicKit.LibraryAlbums[] } }>()
);
export const getLibraryAlbumSongsFailure = createAction(
  '[Music/API] Get Library Album Songs Failure',
  props<{ payload: { error: Error } }>()
);

// URL-based Actions
export const getFromUrl = createAction('[Music/API] Get From Url');
export const getFromUrlSuccess = createAction(
  '[Music/API] Get From Url Success',
  props<{ payload: { data: MusicKit.LibrarySongs[] } }>()
);
export const getFromUrlFailure = createAction(
  '[Music/API] Get From Url Failure',
  props<{ payload: { error: Error } }>()
);

// Current Media Actions
export const setCurrentMedia = createAction(
  '[Music/API] Set Current Media',
  props<{
    payload: { data: MusicKit.MediaItem; type: MediaItemTypes; id: string };
  }>()
);
export const setCurrentMediaSuccess = createAction(
  '[Music/API] Set Current Media Success'
);
export const setCurrentMediaFailure = createAction(
  '[Music/API] Set Current Media Failure',
  props<{ payload: { error: Error } }>()
);

// Library Playlist Actions
export const getLibraryPlaylist = createAction(
  '[Music/API] Get Library Playlist',
  props<{ payload: { playlistId: string } }>()
);
export const getLibraryPlaylistSuccess = createAction(
  '[Music/API] Get Library Playlist Success',
  props<{ payload: { data: MusicKit.LibraryPlaylists } }>()
);
export const getLibraryPlaylistFailure = createAction(
  '[Music/API] Get Library Playlist Failure',
  props<{ payload: { error: Error } }>()
);

// Library Song Actions
export const getLibrarySong = createAction(
  '[Music/API] Get Library Song',
  props<{ payload: { songId: string } }>()
);
export const getLibrarySongSuccess = createAction(
  '[Music/API] Get Library Song Success',
  props<{ payload: { data: MusicKit.LibrarySongs } }>()
);
export const getLibrarySongFailure = createAction(
  '[Music/API] Get Library Song Failure',
  props<{ payload: { error: Error } }>()
);

// Library Album Actions
export const getLibraryAlbum = createAction(
  '[Music/API] Get Library Album',
  props<{ payload: { albumId: string } }>()
);
export const getLibraryAlbumSuccess = createAction(
  '[Music/API] Get Library Album Success',
  props<{ payload: { data: MusicKit.LibraryAlbums } }>()
);
export const getLibraryAlbumFailure = createAction(
  '[Music/API] Get Library Album Failure',
  props<{ payload: { error: Error } }>()
);

// Library Artist Actions
export const getLibraryArtist = createAction(
  '[Music/API] Get Library Artist',
  props<{ payload: { artistId: string } }>()
);
export const getLibraryArtistSuccess = createAction(
  '[Music/API] Get Library Artist Success',
  props<{ payload: { data: MusicAPIEntity } }>()
);
export const getLibraryArtistFailure = createAction(
  '[Music/API] Get Library Artist Failure',
  props<{ payload: { error: Error } }>()
);

// Album Actions
export const getAlbum = createAction(
  '[Music/API] Get Album',
  props<{ payload: { albumId: string } }>()
);
export const getAlbumSuccess = createAction(
  '[Music/API] Get Album Success',
  props<{ payload: { data: MusicKit.Albums } }>()
);
export const getAlbumFailure = createAction(
  '[Music/API] Get Album Failure',
  props<{ payload: { error: Error } }>()
);

// Playlist Actions
export const getPlaylist = createAction(
  '[Music/API] Get Playlist',
  props<{ payload: { playlistId: string } }>()
);
export const getPlaylistSuccess = createAction(
  '[Music/API] Get Playlist Success',
  props<{ payload: { data: MusicKit.Playlists } }>()
);
export const getPlaylistFailure = createAction(
  '[Music/API] Get Playlist Failure',
  props<{ payload: { error: Error } }>()
);

// Navigational Actions
export const getLibraryPlaylistOnNavigation = createAction(
  '[Music/API] Get Library Playlist On Navigation',
  props<{ payload: { playlistId: string } }>()
);
export const getLibraryPlaylistOnNavigationSuccess = createAction(
  '[Music/API] Get Library Playlist On Navigation Success',
  props<{ payload: { data: MusicKit.LibraryPlaylists } }>()
);
export const getLibraryPlaylistOnNavigationFailure = createAction(
  '[Music/API] Get Library Playlist On Navigation Failure',
  props<{ payload: { error: Error } }>()
);

// Add Album Actions
export const addAlbum = createAction(
  '[Music/API] Add Album',
  props<{ payload: { data: MusicKit.LibraryAlbums } }>()
);
export const addAlbumSuccess = createAction('[Music/API] Add Album Success');
export const addAlbumFailure = createAction(
  '[Music/API] Add Album Failure',
  props<{ payload: { error: Error } }>()
);

// Remove Album Actions
export const removeAlbum = createAction(
  '[Music/API] Remove Album',
  props<{ payload: { albumId: string } }>()
);
export const removeAlbumSuccess = createAction(
  '[Music/API] Remove Album Success'
);
export const removeAlbumFailure = createAction(
  '[Music/API] Remove Album Failure',
  props<{ payload: { error: Error } }>()
);

// get media item
export const getMediaItem = createAction(
  '[Music/API] Get Media Item',
  props<{ payload: { type: MediaItemTypes; id: string } }>()
);
export const getMediaItemSuccess = createAction(
  '[Music/API] Get Media Item Success',
  props<{ payload: { data: MusicKit.MediaItem } }>()
);
export const getMediaItemFailure = createAction(
  '[Music/API] Get Media Item Failure',
  props<{ payload: { error: Error } }>()
);

// set current view type
export const setCurrentViewType = createAction(
  '[Music/API] Set Current View Type',
  props<{ payload: { type: MediaItemTypes; id: string } }>()
);
export const setCurrentViewTypeSuccess = createAction(
  '[Music/API] Set Current View Type Success',
  props<{ payload: { type: MediaItemTypes; id: string } }>()
);
export const setCurrentViewTypeFailure = createAction(
  '[Music/API] Set Current View Type Failure',
  props<{ payload: { error: Error } }>()
);

// Get Recommendations Actions
export const getRecommendations = createAction(
  '[Music/API] Get Recommendations'
);
export const getRecommendationsSuccess = createAction(
  '[Music/API] Get Recommendations Success',
  props<{ payload: { data: MusicKit.MediaItem[] } }>()
);
export const getRecommendationsFailure = createAction(
  '[Music/API] Get Recommendations Failure',
  props<{ payload: { error: Error } }>()
);

// Get recently played Actions
export const getRecentlyPlayed = createAction(
  '[Music/API] Get Recently Played'
);
export const getRecentlyPlayedSuccess = createAction(
  '[Music/API] Get Recently Played Success',
  props<{ payload: { data: MusicKit.MediaItem[] } }>()
);
export const getRecentlyPlayedFailure = createAction(
  '[Music/API] Get Recently Played Failure',
  props<{ payload: { error: Error } }>()
);

// Get Recommendations and Recently Played Actions
export const getRecommendationsAndRecentlyPlayed = createAction(
  '[Music/API] Get Recommendations and Recently Played'
);
export const getRecommendationsAndRecentlyPlayedSuccess = createAction(
  '[Music/API] Get Recommendations and Recently Played Success',
  props<{
    payload: {
      data: {
        recommendations: MusicKit.PersonalRecommendation[];
        recentlyPlayed: MusicKit.PersonalRecommendation[];
      };
    };
  }>()
);
export const getRecommendationsAndRecentlyPlayedFailure = createAction(
  '[Music/API] Get Recommendations and Recently Played Failure',
  props<{ payload: { error: Error } }>()
);

// Get artist based on id
export const getArtist = createAction(
  '[Music/API] Get Artist',
  props<{ payload: { artistId: string } }>()
);
export const getArtistSuccess = createAction(
  '[Music/API] Get Artist Success',
  props<{ payload: { data: MusicKit.Artists } }>()
);
export const getArtistFailure = createAction(
  '[Music/API] Get Artist Failure',
  props<{ payload: { error: Error } }>()
);

// Get user ratings from IDs
export const getUserRatingsFromIDs = createAction(
  '[Music/API] Get User Ratings From IDs',
  props<{ payload: { type: MediaItemTypes; ids: string[] } }>()
);
export const getUserRatingsFromIDsSuccess = createAction(
  '[Music/API] Get User Ratings From IDs Success',
  props<{ payload: { data: MusicKit.Ratings[] } }>()
);
export const getUserRatingsFromIDsFailure = createAction(
  '[Music/API] Get User Ratings From IDs Failure',
  props<{ payload: { error: Error } }>()
);

// Love a mediaitem
export const loveMediaItem = createAction(
  '[Music/API] Love Media Item',
  props<{ payload: { type: MediaItemTypes; id: string } }>()
);
export const loveMediaItemSuccess = createAction(
  '[Music/API] Love Media Item Success',
  props<{ payload: { data: MusicKit.Ratings[] } }>()
);
export const loveMediaItemFailure = createAction(
  '[Music/API] Love Media Item Failure',
  props<{ payload: { error: Error } }>()
);
