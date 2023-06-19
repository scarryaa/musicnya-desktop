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
  tap,
  skipWhile,
} from 'rxjs';
import { of } from 'rxjs';
import { MusicAPIActions, SpinnerActions } from '../actions';
import copy from 'fast-copy';
import { select, Store } from '@ngrx/store';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { MusickitAPI } from '@nyan-inc/core-services';
import { MusicState } from '../reducers/music.reducer';
import { SpinnerState } from '../reducers/spinner.reducer';
import { Router, RouterState } from '@angular/router';
import { MusicAPIState } from '../reducers/music-api.reducer';
import {
  selectAllLibraryAlbums,
  selectAllLibraryPlaylists,
  selectAllPersonalRecommendations,
  selectAllPlaylists,
  selectAllRecentlyPlayed,
} from '../selectors';
import { MusicKit } from '@nyan-inc/shared-types';
import { selectAllAlbums } from '../selectors/albums.selectors';
import { selectAllBrowseCategories } from '../selectors/browse-categories.selectors';
import { selectAllRadioCategories } from '../selectors/radio-categories.selectors';

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
      switchMap(([, libraryPlaylists]: [any, MusicKit.LibraryPlaylists[]]) => {
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
            switchMap((playlists: MusicKit.LibraryPlaylists[]) =>
              forkJoin(
                playlists.map((playlist) =>
                  from(musickit.getLibraryPlaylistSongs(playlist.id)).pipe(
                    map((songs: MusicKit.Songs[]) => ({
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
                          url:
                            playlist.attributes?.artwork?.url ||
                            songs?.[0]?.attributes?.artwork.url ||
                            '',
                        },
                      },
                      songs: songs.map((song: MusicKit.Songs) => ({
                        ...song,
                        attributes: {
                          ...song?.attributes,
                          artwork: {
                            ...song.attributes?.artwork,
                            url: song.attributes?.artwork?.url || '',
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

// Fetches library albums if they're not in the store
export const getLibraryAlbums$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store<MusicState & SpinnerState & RouterState>),
    musickit = inject(MusickitAPI)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getLibraryAlbums),
      // Check if albums are already in store
      withLatestFrom(store.select(selectAllLibraryAlbums)),
      switchMap(([, libraryAlbumsStoreData]) =>
        libraryAlbumsStoreData.length > 0
          ? of(
              MusicAPIActions.getLibraryAlbumsSuccess({
                payload: { data: libraryAlbumsStoreData },
              })
            )
          : from(musickit.getLibraryAlbums()).pipe(
              // Convert images to webp
              map((recentlyPlayed) => {
                return libraryAlbumsStoreData;
              }),
              map((libraryAlbumsStoreData) =>
                MusicAPIActions.getRecentlyPlayedSuccess({
                  payload: { data: libraryAlbumsStoreData },
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

// Fetches artist from payload id if they're not in the store
export const getArtist$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store<MusicState & SpinnerState & RouterState>),
    musickit = inject(MusickitAPI)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getArtist),
      tap(() => store.dispatch(SpinnerActions.showSpinner())),
      withLatestFrom(store.pipe(select('artists'))),
      // filter(([action, artists]) => {
      //   const artist = artists.find(
      //     (artist: MusicKit.Artists) => artist.id === action.payload.artistId
      //   );
      //   tap(() => store.dispatch(SpinnerActions.hideSpinner()));
      //   return !artist;
      // }),
      switchMap(([action]) =>
        from(musickit.getArtist(action.payload.artistId))
      ),
      map((data) => {
        const [firstItem] = data as MusicKit.Artists[];

        return MusicAPIActions.getArtistSuccess({
          payload: {
            data: firstItem,
          },
        });
      }),
      switchMap((data) =>
        of(
          data,
          MusicAPIActions.setCurrentMedia({
            payload: {
              data: {
                ...data.payload.data,
                type: 'artists' as unknown as MusicKit.MediaItemType,
              },
              type: 'artists' as unknown as MusicKit.MediaItemType,
              id: data.payload.data.id,
            },
          })
        )
      ),
      tap(() => store.dispatch(SpinnerActions.hideSpinner())),
      tap((payload) => console.log(payload))
    ),
  { functional: true }
);

// Fetches search categories
export const getSearchCategories$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store<MusicState & SpinnerState & RouterState>),
    musickit = inject(MusickitAPI)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getSearchCategories),
      tap(() => store.dispatch(SpinnerActions.showSpinner())),
      switchMap(() => from(musickit.getSearchCategories())),
      // convert to webp
      map((data) =>
        MusicAPIActions.getSearchCategoriesSuccess({ payload: { data: data } })
      ),
      tap(() => store.dispatch(SpinnerActions.hideSpinner()))
    ),
  { functional: true }
);

// Fetches artist from payload id if they're not in the store
export const getCurator$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store<MusicState & SpinnerState & RouterState>),
    musickit = inject(MusickitAPI)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getCurator),
      tap(() => store.dispatch(SpinnerActions.showSpinner())),
      withLatestFrom(store.pipe(select('curators'))),
      // filter(([action, artists]) => {
      //   const artist = artists.find(
      //     (artist: MusicKit.Artists) => artist.id === action.payload.artistId
      //   );
      //   tap(() => store.dispatch(SpinnerActions.hideSpinner()));
      //   return !artist;
      // }),
      switchMap(([action]) =>
        from(musickit.getCurator(action.payload.curatorId))
      ),
      map((data) => {
        const [firstItem] = data as MusicKit.Curators[];

        return MusicAPIActions.getCuratorSuccess({
          payload: {
            data: firstItem,
          },
        });
      }),
      mergeMap((data) => [
        MusicAPIActions.setCurrentMedia({
          payload: {
            data: {
              ...data.payload.data,
              type: 'curators' as unknown as MusicKit.MediaItemType,
            },
            type: 'curators' as unknown as MusicKit.MediaItemType,
            id: data.payload.data.id,
          },
        }),
        MusicAPIActions.getCuratorCategoriesSuccess({
          payload: {
            data:
              data.payload.data.relationships?.grouping?.data.map(
                (category) => {
                  const transformedCategory =
                    transformBrowseCategories(category);
                  console.log(transformedCategory);
                  return transformedCategory;
                }
              ) ||
              data.payload.data.relationships?.playlists.data ||
              [],
          },
        }),
      ]),
      tap(() => store.dispatch(SpinnerActions.hideSpinner())),
      tap((payload) => console.log(payload))
    ),
  { functional: true }
);

// Gets user ratings from ids if not in store
export const getUserRatings$ = createEffect(
  (actions$ = inject(Actions), music = inject(MusickitAPI)) =>
    actions$.pipe(
      ofType(MusicAPIActions.getUserRatingsFromIDs),
      filter((action) => action.payload.type === 'library-playlists'),
      mergeMap((action) =>
        music
          .getRatingsByIDs(action.payload.type, action.payload.ids)
          .then((data: Array<MusicKit.Ratings>) =>
            MusicAPIActions.getUserRatingsFromIDsSuccess({
              payload: { data },
            })
          )
      )
    ),
  { functional: true }
);

const VALID_ROUTES = new Set([
  'library-playlists',
  'library-playlist',
  'library-albums',
  'library-album',
  'library-songs',
  'library-song',
  'library-artists',
  'library-artist',
  'albums',
  'album',
  'artists',
  'artist',
  'playlists',
  'playlist',
  'curators',
  'curator',
  'search',
]);

// Listens to route changes and dispatches the appropriate actions
export const getMediaItemOnRouteChange$ = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store<SpinnerState>)) =>
    actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      map((router) => router.payload?.routerState?.root?.firstChild),
      filter(
        (route) =>
          VALID_ROUTES.has(route?.routeConfig?.path) ||
          VALID_ROUTES.has(route?.params?.type) ||
          VALID_ROUTES.has(route?.routeConfig?.path?.split('/')[1])
      ),
      tap(() => store$.dispatch(SpinnerActions.showSpinner())),
      mergeMap((routeData: any) => [
        // switch based on the type of media item
        routeData.params?.type
          ? routeData.params?.type === 'library-playlist' ||
            routeData.params?.type === 'library-playlists'
            ? MusicAPIActions.getLibraryPlaylist({
                payload: {
                  playlistId: routeData.params?.id,
                },
              })
            : routeData.params?.type === 'library-album' ||
              routeData.params?.type === 'library-albums'
            ? MusicAPIActions.getLibraryAlbum({
                payload: {
                  albumId: routeData.params?.id,
                },
              })
            : routeData.params?.type === 'library-artist' ||
              routeData.params?.type === 'library-artists'
            ? MusicAPIActions.getLibraryArtist({
                payload: {
                  artistId: routeData.params?.id,
                },
              })
            : routeData.params?.type === 'albums'
            ? MusicAPIActions.getAlbum({
                payload: {
                  albumId: routeData.params?.id,
                },
              })
            : routeData.params?.type === 'artists'
            ? MusicAPIActions.getArtist({
                payload: {
                  artistId: routeData.params?.id,
                },
              })
            : routeData.params?.type === 'curators'
            ? MusicAPIActions.getCurator({
                payload: {
                  curatorId: routeData.params?.id,
                },
              })
            : MusicAPIActions.getPlaylist({
                payload: {
                  playlistId: routeData.params?.id,
                },
              })
          : routeData.routeConfig.path.includes('search')
          ? MusicAPIActions.getSearchCategories()
          : routeData.routeConfig.path.includes('curators')
          ? MusicAPIActions.getCurator({
              payload: {
                curatorId: routeData.params?.id,
              },
            })
          : MusicAPIActions.getArtist({
              payload: {
                artistId: routeData.params?.id,
              },
            }),
      ])
    ),
  { functional: true }
);

// Fetches an album
export const getAlbum$ = createEffect(
  (
    actions$ = inject(Actions),
    music = inject(MusickitAPI),
    store = inject(Store<MusicAPIState>)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getAlbum),
      // Check if the album is in the store
      withLatestFrom(store.select(selectAllAlbums)),
      // If the album is not in the store, fetch it
      // filter(
      //   ([action, albums]) =>
      //     !albums.some((album) => album.id === action.payload.albumId)
      // ),
      tap(() => store.dispatch(SpinnerActions.showSpinner())),
      // Fetch the album
      mergeMap(([action]) =>
        music.getAlbum(action.payload.albumId).then((data: MusicKit.Albums[]) =>
          MusicAPIActions.getAlbumSuccess({
            payload: {
              data: data[0],
            },
          })
        )
      ),
      switchMap((data) =>
        of(
          data,
          MusicAPIActions.setCurrentMedia({
            payload: {
              data: {
                ...data.payload.data,
                type: 'albums' as unknown as MusicKit.MediaItemType,
              },
              type: 'albums' as unknown as MusicKit.MediaItemType,
              id: data.payload.data.id,
            },
          })
        )
      ),
      tap(() => store.dispatch(SpinnerActions.hideSpinner()))
    ),
  { functional: true }
);

// Fetches a library playlist
export const getLibraryPlaylist$ = createEffect(
  (
    actions$ = inject(Actions),
    music = inject(MusickitAPI),
    store = inject(Store<MusicAPIState>)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getLibraryPlaylist),
      tap(() => store.dispatch(SpinnerActions.showSpinner())),
      // Check if the library playlist is in the store
      withLatestFrom(store.select(selectAllLibraryPlaylists)),
      // If the library playlist is not in the store, fetch it
      switchMap(([action, libraryPlaylists]) =>
        libraryPlaylists.some(
          (libraryPlaylist) => libraryPlaylist.id === action.payload.playlistId
        )
          ? of(
              MusicAPIActions.getLibraryPlaylistSuccess({
                payload: {
                  data: libraryPlaylists.find(
                    (libraryPlaylist) =>
                      libraryPlaylist.id === action.payload.playlistId
                  )!,
                },
              })
            ) // Fetch the library playlist
          : music
              .getLibraryPlaylist(action.payload.playlistId)
              .then((data: MusicKit.LibraryPlaylists[]) =>
                MusicAPIActions.getLibraryPlaylistSuccess({
                  payload: {
                    data: data[0],
                  },
                })
              )
      ),
      switchMap((data) =>
        of(
          data,
          MusicAPIActions.setCurrentMedia({
            payload: {
              data: {
                ...data.payload.data,
                type: 'library-playlists' as unknown as MusicKit.MediaItemType,
              },
              type: 'library-playlists' as unknown as MusicKit.MediaItemType,
              id: data.payload.data.id,
            },
          })
        )
      ),
      tap(() => store.dispatch(SpinnerActions.hideSpinner()))
    ),
  { functional: true }
);

// Searches for a term
export const search$ = createEffect(
  (
    actions$ = inject(Actions),
    music = inject(MusickitAPI),
    store = inject(Store<MusicAPIState>)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.search),
      // tap(() => store.dispatch(SpinnerActions.showSpinner())),
      // Fetch the search results
      switchMap((action) =>
        music
          .getSearchSuggestions(action.payload.term)
          .then((data: MusicKit.SearchSuggestionsResponse) =>
            MusicAPIActions.searchSuccess({
              payload: {
                data: data.results.suggestions,
              },
            })
          )
      )
      // tap(() => store.dispatch(SpinnerActions.hideSpinner()))
    ),
  { functional: true }
);

// Fetches a playlist
export const getPlaylist$ = createEffect(
  (
    actions$ = inject(Actions),
    music = inject(MusickitAPI),
    store = inject(Store<MusicAPIState>)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getPlaylist),
      // Check if the playlist is in the store
      tap(() => store.dispatch(SpinnerActions.showSpinner())),
      withLatestFrom(store.select(selectAllPlaylists)),
      // If the playlist is not in the store, fetch it
      switchMap(([action, playlists]) =>
        playlists.some(
          (playlists) => playlists.id === action.payload.playlistId
        )
          ? of(
              MusicAPIActions.getPlaylistSuccess({
                payload: {
                  data: playlists.find(
                    (playlists) => playlists.id === action.payload.playlistId
                  )!,
                },
              })
            ) // Fetch the library playlist
          : music
              .getPlaylist(action.payload.playlistId)
              .then((data: MusicKit.Playlists[]) =>
                MusicAPIActions.getPlaylistSuccess({
                  payload: {
                    data: data[0],
                  },
                })
              )
      ),
      switchMap((data) =>
        of(
          data,
          MusicAPIActions.setCurrentMedia({
            payload: {
              data: {
                ...data.payload.data,
                type: 'playlists' as unknown as MusicKit.MediaItemType,
              },
              type: 'playlists' as unknown as MusicKit.MediaItemType,
              id: data.payload.data.id,
            },
          })
        )
      ),
      tap(() => store.dispatch(SpinnerActions.hideSpinner()))
    ),
  { functional: true }
);

export const getRecommendationsAndRecentlyPlayed$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(MusicAPIActions.getRecommendationsAndRecentlyPlayed),
      tap(() => store.dispatch(SpinnerActions.showSpinner())),
      // dispatch getRecommendations and getRecentlyPlayed actions
      mergeMap(() => [MusicAPIActions.getRecommendations()]),
      tap(() => store.dispatch(SpinnerActions.hideSpinner())),
      catchError((error) =>
        of(
          MusicAPIActions.getRecommendationsAndRecentlyPlayedFailure({
            payload: { error },
          })
        )
      )
    ),
  { functional: true }
);

// Fetches radio categories
export const getRadioCategories$ = createEffect(
  (
    actions$ = inject(Actions),
    musickit = inject(MusickitAPI),
    store = inject(Store<MusicAPIState>)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getRadioCategories),
      tap(() => store.dispatch(SpinnerActions.showSpinner())),
      // Check if radio categories are already in store
      withLatestFrom(store.select(selectAllRadioCategories)),
      switchMap(([, radioCategoriesStoreData]) => {
        if (radioCategoriesStoreData.length > 0) {
          store.dispatch(SpinnerActions.hideSpinner());
          return of(
            MusicAPIActions.getRadioCategoriesSuccess({
              payload: { data: radioCategoriesStoreData },
            })
          );
        } else {
          return from(musickit.getRadioCategories()).pipe(
            tap(() => store.dispatch(SpinnerActions.hideSpinner())),
            map((radioCategories) =>
              MusicAPIActions.getRadioCategoriesSuccess({
                payload: { data: radioCategories },
              })
            )
          );
        }
      })
    ),
  { functional: true }
);

// Fetches browse categories
export const getBrowseCategories$ = createEffect(
  (
    actions$ = inject(Actions),
    musickit = inject(MusickitAPI),
    store = inject(Store<MusicAPIState>)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getBrowseCategories),
      tap(() => store.dispatch(SpinnerActions.showSpinner())),
      // Check if browse categories are already in store
      withLatestFrom(store.select(selectAllBrowseCategories)),
      switchMap(([, browseCategoriesStoreData]) =>
        browseCategoriesStoreData.length > 0
          ? of(
              MusicAPIActions.getBrowseCategoriesSuccess({
                payload: { data: browseCategoriesStoreData },
              })
            )
          : from(musickit.getBrowseCategories()).pipe(
              // Convert images to webp

              tap(() => store.dispatch(SpinnerActions.hideSpinner())),
              map((browseCategories) =>
                MusicAPIActions.getBrowseCategoriesSuccess({
                  payload: { data: browseCategories },
                })
              ),
              catchError((error) =>
                of(
                  MusicAPIActions.getBrowseCategoriesFailure({
                    payload: { error },
                  })
                )
              )
            )
      ),
      tap(() => store.dispatch(SpinnerActions.hideSpinner()))
    ),
  { functional: true }
);

// Fetches user recommendations
export const getRecommendations$ = createEffect(
  (
    actions$ = inject(Actions),
    musickit = inject(MusickitAPI),
    store = inject(Store<MusicAPIState>)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getRecommendations),
      // Check if recommendations are already in store
      tap(() => store.dispatch(SpinnerActions.showSpinner())),
      withLatestFrom(store.select(selectAllPersonalRecommendations)),
      switchMap(([, recommendationsStoreData]) => {
        if (false) {
          store.dispatch(SpinnerActions.hideSpinner());
          return of(
            MusicAPIActions.getRecommendationsSuccess({
              payload: { data: recommendationsStoreData },
            })
          );
        } else {
          return from(musickit.getRecommendations()).pipe(
            //map promise to observable and emit
            map((recommendations) =>
              MusicAPIActions.getRecommendationsSuccess({
                payload: { data: recommendations },
              })
            )
          );
        }
      }),
      tap(() => store.dispatch(SpinnerActions.hideSpinner()))
    ),
  { functional: true }
);

// Fetches recently played
export const getRecentlyPlayed$ = createEffect(
  (
    actions$ = inject(Actions),
    musickit = inject(MusickitAPI),
    store = inject(Store<MusicAPIState>)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getRecentlyPlayed),
      // Check if recently played is already in store
      withLatestFrom(store.select(selectAllRecentlyPlayed)),
      switchMap(([, recentlyPlayedStoreData]) =>
        recentlyPlayedStoreData.length > 0
          ? of(
              MusicAPIActions.getRecentlyPlayedSuccess({
                payload: { data: recentlyPlayedStoreData },
              })
            )
          : from(musickit.getRecentlyPlayed()).pipe(
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

// fetches the media's curatorID
export const getCuratorID$ = createEffect(
  (
    actions$ = inject(Actions),
    musickit = inject(MusickitAPI),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getCuratorID),
      switchMap((action) =>
        from(musickit.getCuratorFromPlaylist(action.payload.id)).pipe(
          //TODO probably a better way to do this routing event
          tap((data) => router.navigateByUrl(`/media/curators/${data[0].id}`)),
          map((data) =>
            MusicAPIActions.getCuratorIDSuccess({
              payload: { id: data[0].id },
            })
          )
        )
      )
    ),
  { functional: true }
);

// sets the current media item and returns it
export const setCurrentMedia$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store<MusicAPIState>)) =>
    actions$.pipe(
      ofType(MusicAPIActions.setCurrentMedia),
      map((action) => action.payload),
      tap((payload) => {
        console.log(payload);
        const data =
          payload.data.songs ||
          payload.data.relationships?.tracks?.data ||
          payload.data.relationships?.songs?.data;
        console.log(data);

        if (data === undefined || data.length === 0) {
          return;
        }
        const ids = data.map(
          (song: MusicKit.Songs | MusicKit.Resource) =>
            song.relationships?.catalog?.data?.[0].id || song.id
        );

        // TODO implement a better solution
        if (ids !== undefined && ids.length > 0) {
          store.dispatch(
            MusicAPIActions.getItemLikes({
              payload: {
                type:
                  data[0].relationships?.catalog?.data?.[0].type ||
                  data[0].type,
                ids: ids,
              },
            })
          );
        }
      }),
      map(() => MusicAPIActions.setCurrentMediaSuccess())
    ),
  { functional: true }
);

// Fetches likes for all songs in a media item
export const getItemLikes$ = createEffect(
  (
    actions$ = inject(Actions),
    musickit = inject(MusickitAPI),
    store = inject(Store<MusicAPIState>)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getItemLikes),
      tap(() => store.dispatch(SpinnerActions.showSpinner())),
      switchMap((action) =>
        from(musickit.getLikes(action.payload.type, action.payload.ids)).pipe(
          map((data) =>
            MusicAPIActions.getItemLikesSuccess({
              payload: { items: data as MusicKit.Ratings[] },
            })
          )
        )
      ),
      tap(() => store.dispatch(SpinnerActions.hideSpinner()))
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
          map((songs: MusicKit.LibrarySongs[]) => {
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
                  id: song.attributes?.playParams?.id || '',
                  kind: song.attributes?.playParams?.kind || 'song',
                },
                artwork: {
                  ...song.attributes?.artwork,
                  height: song.attributes?.artwork.height || 0,
                  width: song.attributes?.artwork.width || 0,
                  url: song.attributes?.artwork?.url || '',
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

// Unlove media item
export const unloveMediaItem$ = createEffect(
  (actions$ = inject(Actions), musickit = inject(MusickitAPI)) =>
    actions$.pipe(
      ofType(MusicAPIActions.unloveMediaItem),
      switchMap((action) =>
        from(musickit.unloveItem(action.payload.type, action.payload.id)).pipe(
          map(() =>
            MusicAPIActions.unloveMediaItemSuccess({
              payload: {
                data: [
                  {
                    id: action.payload.id,
                    attributes: { value: 0 },
                    type: 'ratings',
                  },
                ],
              },
            })
          )
        )
      )
    ),
  { functional: true }
);

// Love media item
export const loveMediaItem$ = createEffect(
  (actions$ = inject(Actions), musickit = inject(MusickitAPI)) =>
    actions$.pipe(
      ofType(MusicAPIActions.loveMediaItem),
      switchMap((action) =>
        from(musickit.loveItem(action.payload.type, action.payload.id)).pipe(
          map(() =>
            MusicAPIActions.loveMediaItemSuccess({
              payload: {
                data: [
                  {
                    id: action.payload.id,
                    attributes: { value: 1 },
                    type: 'ratings',
                  },
                ],
              },
            })
          )
        )
      )
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

// Fetches room
export const getRoom$ = createEffect(
  (
    actions$ = inject(Actions),
    musickit = inject(MusickitAPI),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(MusicAPIActions.getRoom),
      switchMap((action) =>
        from(musickit.getRoom(action.payload.id, action.payload.type))
      ),
      tap((data) => console.log(data)),
      tap((data) => router.navigateByUrl(`/media/rooms/${data.id}`)),
      map((room) =>
        MusicAPIActions.getRoomSuccess({
          payload: { data: copy(room) },
        })
      )
    ),
  { functional: true }
);

// utility functions
const transformArtworkUrl = (url: string, size: number) => {
  const newUrl = url
    .replace('{w}x{h}', `${size}x${size}`)
    .replace('{f}', 'webp');
  return newUrl;
};

const transformBrowseCategories: any = (node: any) => {
  if (Array.isArray(node)) {
    return node.map((element) => transformBrowseCategories(element));
  } else if (node !== null && typeof node === 'object') {
    const newNode = { ...node };

    if (
      newNode.attributes &&
      newNode.attributes.artwork &&
      newNode.attributes.artwork.url
    ) {
      const newAttributes = { ...newNode.attributes };
      const newArtwork = { ...newAttributes.artwork };

      newAttributes.artwork = newArtwork;
      newNode.attributes = newAttributes;
    }

    return newNode;
  }
  return node;
};
