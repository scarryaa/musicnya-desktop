import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  switchMap,
  catchError,
  map,
  filter,
  mergeMap,
  from,
  withLatestFrom,
  forkJoin,
  concatMap,
  tap,
  skipWhile,
  take,
} from 'rxjs';
import { of } from 'rxjs';
import { MusicAPIActions, SpinnerActions } from '../actions';
import copy from 'fast-copy';
import { select, Store } from '@ngrx/store';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { MusickitAPI } from '@yan-inc/core-services';
import {
  LibraryPlaylists,
  Resource,
  MediaItemTypes,
  LibrarySongs,
  PersonalRecommendation,
  Songs,
} from '@nyan-inc/core';
import { MusicState } from '../reducers/music.reducer';
import { SpinnerState } from '../reducers/spinner.reducer';

//Load music api
export const loadMusicAPI$ = createEffect(
  (actions$ = inject(Actions), musickit = inject(MusickitAPI)) =>
    actions$.pipe(
      ofType(MusicAPIActions.loadMusicAPI),
      skipWhile(() => !musickit.instance),
      switchMap(() => of(MusicAPIActions.loadMusicAPISuccess())),
      catchError((error: Error) => {
        console.error('Error', error);
        return of(MusicAPIActions.loadMusicAPIFailure({ payload: { error } }));
      })
    ),
  { functional: true }
);

// Checks the store for library playlists and if they're not there, fetches them from Musickit API
export const getLibraryPlaylists$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store<MusicState & SpinnerState>),
    musickit = inject(MusickitAPI)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getLibraryPlaylists),
      withLatestFrom(store.pipe(select('libraryPlaylists'))),
      switchMap(([, libraryPlaylists]: [any, LibraryPlaylists[]]) => {
        if (libraryPlaylists && libraryPlaylists.length > 0) {
          console.log('library playlists already in store');
          return of(
            MusicAPIActions.getLibraryPlaylistsSuccess({
              payload: { data: libraryPlaylists },
            })
          );
        } else {
          // get library playlists and then songs
          return from(musickit.getLibraryPlaylists()).pipe(
            switchMap((playlists: LibraryPlaylists[]) =>
              forkJoin(
                playlists.map((playlist) =>
                  from(musickit.getLibraryPlaylistSongs(playlist.id)).pipe(
                    map((songs: Songs[]) => ({
                      ...playlist,
                      attributes: {
                        ...playlist.attributes,
                        name: playlist.attributes?.name || '',
                        lastModifiedDate:
                          playlist.attributes?.lastModifiedDate || '',
                        canEdit: playlist.attributes?.canEdit || false,
                        dateCreated: playlist.attributes?.dateCreated || '',
                        hasCatalog: playlist.attributes?.hasCatalog || false,
                        isPublic: playlist.attributes?.isPublic || false,
                        isPublished: playlist.attributes?.isPublished || false,
                        playParams: playlist.attributes?.playParams || {
                          id: '',
                          kind: 'playlist',
                        },
                        url: playlist.attributes?.url || '',
                        durationInMillis:
                          playlist.attributes?.durationInMillis || 0,
                        artwork: {
                          ...playlist.attributes?.artwork,
                          height: playlist.attributes?.artwork?.height || 0,
                          width: playlist.attributes?.artwork?.width || 0,
                          url: transformArtworkUrl(
                            playlist.attributes?.artwork?.url ||
                              songs?.[0]?.attributes?.artwork.url ||
                              '',
                            200
                          ),
                        },
                      },
                      songs: songs.map((song: Songs) => ({
                        ...song,
                        attributes: {
                          ...song?.attributes,
                          artwork: {
                            ...song.attributes?.artwork,
                            url: transformArtworkUrl(
                              song.attributes?.artwork?.url || '',
                              48
                            ),
                          },
                        },
                      })),
                    }))
                  )
                )
              )
            ),
            tap(() => store.dispatch(SpinnerActions.hideSpinner())),
            map((playlists) =>
              MusicAPIActions.getLibraryPlaylistsSuccess({
                payload: { data: copy(playlists) },
              })
            ),
            catchError((error) =>
              of(
                MusicAPIActions.getLibraryPlaylistsFailure({
                  payload: { error },
                })
              )
            )
          );
        }
      })
    ),
  { functional: true }
);

// // Fetches library albums if they're not in the store
// getLibraryAlbums$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(MusicAPIActions.getLibraryAlbum),
//     withLatestFrom(this.store.select('libraryAlbums')),
//     filter(
//       ([action, libraryAlbums]) =>
//         !libraryAlbums || libraryAlbums.length === 0
//     ),
//     switchMap(
//       ([action, libraryAlbums]) =>
//         libraryAlbums ?? this.musickit.getLibraryAlbums()
//     ),
//     map(fromMusickit),
//     map((albums) =>
//       MusicAPIActions.getLibraryAlbumsSuccess({
//         payload: { data: copy(albums) },
//       })
//     ),
//     catchError((error) =>
//       of(MusicAPIActions.getLibraryAlbumsFailure({ error }))
//     )
//   )
// );

// Fetches media item based on the route params
export const getMediaItemOnRouteChange$ = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store<SpinnerState>)) =>
    actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      tap(() => store$.dispatch(SpinnerActions.showSpinner())),
      map((router) => router.payload?.routerState?.root?.firstChild?.params),
      filter(
        (parameters: RouteParameters) => !!parameters.id && !!parameters.type
      ),
      mergeMap((parameters: RouteParameters) => [
        MusicAPIActions.getMediaItem({
          payload: {
            type: parameters.type,
            id: parameters.id,
          },
        }),
        MusicAPIActions.setCurrentViewType({
          payload: { type: parameters.type, id: parameters.id },
        }),
      ]),
      tap(() => store$.dispatch(SpinnerActions.hideSpinner())),
      catchError((error) =>
        of(MusicAPIActions.getMediaItemFailure({ payload: { error } }))
      )
    ),
  { functional: true }
);

export const getRecommendationsAndRecentlyPlayed$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    musickit = inject(MusickitAPI)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getRecommendationsAndRecentlyPlayed),
      tap(() => store.dispatch(SpinnerActions.showSpinner())),
      withLatestFrom(store.pipe(select('musicApi', 'homeTileLists'))),
      tap((value) => console.log(value)),
      switchMap(([, payload]) => {
        if (
          payload &&
          payload?.[0]?.data?.length &&
          payload?.[1]?.data?.length
        ) {
          console.log('recommendations already in store');
          console.log(payload);
          store.dispatch(SpinnerActions.hideSpinner());
          return of(
            MusicAPIActions.getRecommendationsAndRecentlyPlayedSuccess({
              payload: {
                data: {
                  recommendations: payload[0].data,
                  recentlyPlayed: payload[1].data,
                },
              },
            })
          );
        } else {
          console.log('recommendations are not in store');
          return forkJoin([
            musickit.getRecommendations(),
            musickit.getRecentlyPlayed(),
          ]).pipe(
            map(([recommendations, recentlyPlayed]) => {
              const modifiedRecommendations = recommendations.map(
                (item: PersonalRecommendation) => ({
                  ...item,
                  relationships: {
                    ...item.relationships,
                    contents: {
                      ...item.relationships?.contents,
                      data: item.relationships?.contents?.data?.map(
                        (item: Resource) => ({
                          ...item,
                          attributes: {
                            ...item.attributes,
                            artwork: {
                              ...item.attributes?.artwork,
                              url: transformArtworkUrl(
                                item.attributes?.artwork?.url || '',
                                200
                              ),
                            },
                          },
                        })
                      ),
                    },
                  },
                })
              );

              const modifiedRecentlyPlayed = recentlyPlayed.map(
                (item: Resource) => ({
                  ...item,
                  attributes: {
                    ...item.attributes,
                    artwork: {
                      ...item.attributes?.artwork,
                      url: item.attributes?.artwork?.url
                        .replace('{w}x{h}', '200x200')
                        .replace('{f}', 'webp'),
                    },
                  },
                })
              );

              store.dispatch(SpinnerActions.hideSpinner());
              return MusicAPIActions.getRecommendationsAndRecentlyPlayedSuccess(
                {
                  payload: {
                    data: {
                      recommendations: modifiedRecommendations,
                      recentlyPlayed: modifiedRecentlyPlayed,
                    },
                  },
                }
              );
            })
          );
        }
      })
    ),
  { functional: true }
);

// Fetches user recommendations
export const getRecommendations$ = createEffect(
  (actions$ = inject(Actions), musickit = inject(MusickitAPI)) =>
    actions$.pipe(
      ofType(MusicAPIActions.getRecommendations),
      switchMap(() =>
        from(musickit.getRecommendations()).pipe(
          map((recommendations) =>
            MusicAPIActions.getRecommendationsSuccess({
              payload: { data: recommendations },
            })
          ),
          catchError((error) =>
            of(
              MusicAPIActions.getRecommendationsFailure({
                payload: { error },
              })
            )
          )
        )
      )
    ),
  { functional: true }
);

// Fetches recently played
export const getRecentlyPlayed$ = createEffect(
  (actions$ = inject(Actions), musickit = inject(MusickitAPI)) =>
    actions$.pipe(
      ofType(MusicAPIActions.getRecentlyPlayed),
      switchMap(() =>
        from(musickit.getRecentlyPlayed()).pipe(
          map((recentlyPlayed) =>
            MusicAPIActions.getRecentlyPlayedSuccess({
              payload: { data: recentlyPlayed },
            })
          ),
          catchError((error) =>
            of(
              MusicAPIActions.getRecentlyPlayedFailure({
                payload: { error },
              })
            )
          )
        )
      )
    ),
  { functional: true }
);

// Fetches media item based on the type and id
// look in the media cache and library playlists
// if not found, fetch from musickit api by url and then add to cache
export const getMediaItem$ = createEffect(
  (
    actions$ = inject(Actions),
    musickit = inject(MusickitAPI),
    store = inject(Store<MusicState & SpinnerState>)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getMediaItem),
      tap(() => store.dispatch(SpinnerActions.showSpinner())),
      withLatestFrom(
        store.pipe(select('musicApi', 'mediaCache')),
        store.pipe(select('musicApi', 'libraryPlaylists'))
      ),
      switchMap(([action, mediaCache, libraryPlaylists]: any) => {
        const { type, id } = action.payload;
        const foundInCache = mediaCache?.find((item: any) => item.id === id);

        if (foundInCache) {
          console.log('Found in cache');
          store.dispatch(SpinnerActions.hideSpinner());
          return of(
            MusicAPIActions.getMediaItemSuccess({
              payload: { data: copy(foundInCache) },
            }),
            MusicAPIActions.setCurrentMedia({
              payload: { data: foundInCache },
            })
          );
          store.dispatch(SpinnerActions.hideSpinner());
        } else {
          const foundInLibrary = libraryPlaylists?.find(
            (playlist: any) => playlist.id === id
          );

          if (foundInLibrary) {
            console.log('Found in library playlists');
            store.dispatch(SpinnerActions.hideSpinner());
            return of(
              MusicAPIActions.getMediaItemSuccess({
                payload: { data: copy(foundInLibrary) },
              }),
              MusicAPIActions.setCurrentMedia({
                payload: { data: foundInLibrary },
              })
            );
          } else {
            console.log("Didn't find in cache or library");
            return from(musickit.findByUrl(type, id)).pipe(
              map((data) => {
                const [firstItem] = data;

                if (firstItem && firstItem.attributes?.artwork?.url) {
                  firstItem.attributes.artwork.url =
                    firstItem.attributes?.artwork.url
                      .replace('{w}x{h}', '400x400')
                      .replace('{f}', 'webp');
                }

                console.log(firstItem.relationships.tracks.data);
                if (firstItem && firstItem?.relationships?.tracks) {
                  for (const track of firstItem.relationships.tracks.data) {
                    if (track.attributes?.artwork?.url) {
                      track.attributes.artwork.url =
                        track.attributes?.artwork.url
                          .replace('{w}x{h}', '400x400')
                          .replace('{f}', 'webp');
                    }
                  }
                }

                return MusicAPIActions.getMediaItemSuccess({
                  payload: { data: copy(firstItem) },
                });
              }),
              concatMap((data) =>
                of(
                  data,
                  MusicAPIActions.setCurrentMedia({
                    payload: { data: data.payload.data },
                  })
                )
              ),
              tap(() => store.dispatch(SpinnerActions.hideSpinner()))
            );
          }
          tap(() => store.dispatch(SpinnerActions.hideSpinner()));
        }
      })
    ),
  { functional: true }
);

// sets the current media item and returns it
export const setCurrentMedia$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(MusicAPIActions.setCurrentMedia),
      map((action) => action.payload),
      map(() => MusicAPIActions.setCurrentMediaSuccess()),
      catchError((error) =>
        of(MusicAPIActions.setCurrentMediaFailure({ payload: { error } }))
      )
    ),
  { functional: true }
);

// Fetches songs for given library playlist
export const getLibraryPlaylistSongs$ = createEffect(
  (actions$ = inject(Actions), musickit = inject(MusickitAPI)) =>
    actions$.pipe(
      ofType(MusicAPIActions.getLibraryPlaylistSongs),
      switchMap((action) => {
        return from(
          musickit.getLibraryPlaylistSongs(action.payload.playlist.id)
        ).pipe(
          map((songs: LibrarySongs[]) => {
            const updatedSongs = songs.map((song) => ({
              ...song,
              attributes: {
                ...song.attributes,
                name: song.attributes?.name || '',
                artistName: song.attributes?.artistName || '',
                trackNumber: song.attributes?.trackNumber || 0,
                discNumber: song.attributes?.discNumber || 0,
                durationInMillis: song.attributes?.durationInMillis || 0,
                genreNames: song.attributes?.genreNames || [],
                hasLyrics: song.attributes?.hasLyrics || false,
                url: song.attributes?.url || '',
                isSingle: song.attributes?.isSingle || false,
                isMasteredForItunes:
                  song.attributes?.isMasteredForItunes || false,
                playParams: {
                  ...song.attributes?.playParams,
                  id: song.attributes?.playParams.id || '',
                  kind: song.attributes?.playParams.kind || 'song',
                },
                artwork: {
                  ...song.attributes?.artwork,
                  height: song.attributes?.artwork.height || 0,
                  width: song.attributes?.artwork.width || 0,
                  url: transformArtworkUrl(
                    song.attributes?.artwork?.url || '',
                    40
                  ),
                },
              },
            }));

            return MusicAPIActions.getLibraryPlaylistSongsSuccess({
              payload: {
                playlist: action.payload.playlist,
                songs: updatedSongs,
              },
            });
          }),
          catchError((error) =>
            of(
              MusicAPIActions.getLibraryPlaylistSongsFailure({
                payload: { error },
              })
            )
          )
        );
      })
    ),
  { functional: true }
);

// // Fetches songs for given library albums
// getLibraryAlbumSongs$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(MusicAPIActions.getLibraryAlbumSongs),
//     switchMap((action) =>
//       this.musickit.getLibraryAlbumSongs(action.payload.albums)
//     ),
//     map(fromMusickit),
//     map((songs) =>
//       MusicAPIActions.getLibraryAlbumSongsSuccess({
//         payload: { data: copy(songs) },
//       })
//     ),
//     catchError((error) =>
//       of(MusicAPIActions.getLibraryAlbumSongsFailure({ payload: { error } }))
//     )
//   )
// );

// Fetches library album
// getLibraryAlbum$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(MusicAPIActions.getLibraryAlbum),
//     switchMap((action) =>
//       this.musickit.getLibraryAlbum(action.payload.albumId)
//     ),
//     map(fromMusickit),
//     map((album) =>
//       MusicAPIActions.getLibraryAlbumSuccess({
//         payload: { data: copy(album[0]) },
//       })
//     ),
//     catchError((error) =>
//       of(MusicAPIActions.getLibraryAlbumFailure({ payload: { error } }))
//     )
//   )
// );

// sets the current media type
export const setCurrentViewType$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(MusicAPIActions.setCurrentViewType),
      map((action) =>
        MusicAPIActions.setCurrentViewTypeSuccess({
          payload: {
            type: copy(action.payload.type),
            id: copy(action.payload.id),
          },
        })
      ),
      catchError((error) =>
        of(MusicAPIActions.setCurrentViewTypeFailure({ payload: { error } }))
      )
    ),
  { functional: true }
);

// utility functions

interface RouteParameters {
  id: string;
  type: MediaItemTypes;
}

const transformArtworkUrl = (url: string, size: number) => {
  return url.replace('{w}x{h}', `${size}x${size}`).replace('{f}', 'webp');
};
