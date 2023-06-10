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
import { MediaItemTypes, Songs } from '@nyan-inc/core';
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
                for (const item of libraryAlbumsStoreData) {
                  if (item.attributes?.['artwork']?.url) {
                    item.attributes['artwork'].url = transformArtworkUrl(
                      item.attributes['artwork'].url,
                      160
                    );
                  }
                }
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

        if (firstItem && firstItem.attributes?.artwork?.url) {
          firstItem.attributes.artwork.url = firstItem.attributes?.artwork.url
            .replace('{w}x{h}', '1000x500')
            .replace('{f}', 'webp');
        }

        if (
          firstItem &&
          firstItem?.attributes?.editorialArtwork?.bannerUber?.url
        ) {
          firstItem.attributes.editorialArtwork.bannerUber.url =
            firstItem.attributes.editorialArtwork.bannerUber.url
              .replace('{w}x{h}', '1000x500')
              .replace('{f}', 'webp');
        }

        if (
          firstItem &&
          firstItem?.attributes?.editorialArtwork?.storeFlowcase?.url
        ) {
          firstItem.attributes.editorialArtwork.storeFlowcase.url =
            firstItem.attributes.editorialArtwork.storeFlowcase.url
              .replace('{w}x{h}', '1000x500')
              .replace('{f}', 'webp');
        }

        if (firstItem && firstItem?.relationships?.albums?.data) {
          firstItem.relationships.albums.data =
            firstItem.relationships.albums.data.sort((a: any, b: any) => {
              const aDate = new Date(a.attributes.releaseDate);
              const bDate = new Date(b.attributes.releaseDate);
              return bDate.getTime() - aDate.getTime();
            });
        }
        // }

        if (firstItem && firstItem?.relationships?.albums?.data) {
          for (const album of firstItem.relationships.albums.data) {
            if (album.attributes?.artwork?.url) {
              album.attributes.artwork.url = album.attributes?.artwork.url
                .replace('{w}x{h}', '400x400')
                .replace('{f}', 'webp');
            }
          }
        }

        if (firstItem && firstItem?.views?.['top-songs']) {
          for (const track of firstItem.views['top-songs'].data) {
            if (track.attributes?.['artwork']?.url) {
              track.attributes['artwork'].url = track.attributes?.[
                'artwork'
              ].url
                .replace('{w}x{h}', '400x400')
                .replace('{f}', 'webp');
            }
          }
        }

        if (firstItem && firstItem?.relationships?.playlists) {
          for (const playlist of firstItem.relationships.playlists
            .data as unknown as MusicKit.Playlists[]) {
            if (playlist.attributes?.artwork?.url) {
              playlist.attributes.artwork.url = playlist.attributes?.artwork.url
                .replace('{w}x{h}', '400x400')
                .replace('{f}', 'webp');
            }
          }
        }

        if (firstItem?.relationships?.['music-videos']) {
          for (const video of firstItem.relationships['music-videos']
            .data as unknown as MusicKit.MusicVideos[]) {
            if (video.attributes?.artwork?.url) {
              video.attributes.artwork.url =
                video.attributes?.artwork.url.replace('{w}x{h}', '400x400');
            }
          }
        }

        if (firstItem && firstItem?.views?.['similar-artists']) {
          for (const artist of firstItem.views['similar-artists'].data) {
            if (artist.attributes?.['artwork']?.url) {
              artist.attributes['artwork'].url = artist.attributes?.[
                'artwork'
              ].url
                .replace('{w}x{h}', '400x400')
                .replace('{f}', 'webp');
            }
          }
        }

        if (firstItem && firstItem?.views?.['latest-release']) {
          for (const artist of firstItem.views['latest-release'].data) {
            if (artist.attributes?.['artwork']?.url) {
              artist.attributes['artwork'].url = artist.attributes?.[
                'artwork'
              ].url
                .replace('{w}x{h}', '400x400')
                .replace('{f}', 'webp');
            }
          }
        }

        if (firstItem && firstItem?.views?.['featured-albums']) {
          for (const artist of firstItem.views['featured-albums'].data) {
            if (artist.attributes?.['artwork']?.url) {
              artist.attributes['artwork'].url = artist.attributes?.[
                'artwork'
              ].url
                .replace('{w}x{h}', '400x400')
                .replace('{f}', 'webp');
            }
          }
        }

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
      map((data) => {
        for (const item of data[2].relationships?.['contents']?.data ?? []) {
          if (item.attributes?.['editorialArtwork']?.bannerUber?.url) {
            item.attributes['editorialArtwork'].bannerUber.url =
              item.attributes?.['editorialArtwork'].bannerUber.url
                .replace('{w}x{h}', '800x800')
                .replace('{c}', '')
                .replace('{f}', 'webp');
          }

          if (item.attributes?.['editorialArtwork']?.subscriptionHero?.url) {
            item.attributes['editorialArtwork'].subscriptionHero.url =
              item.attributes?.['editorialArtwork'].subscriptionHero.url
                .replace('{w}x{h}', '800x800')
                .replace('{c}', '')
                .replace('{f}', 'webp');
          }

          if (item.attributes?.['artwork']?.url) {
            item.attributes['artwork'].url = item.attributes?.['artwork'].url
              .replace('{w}x{h}', '800x800')
              .replace('{c}', '')
              .replace('{f}', 'webp');
          }

          if (item.attributes?.['editorialArtwork']?.subscriptionCover?.url) {
            item.attributes['editorialArtwork'].subscriptionCover.url =
              item.attributes?.['editorialArtwork']?.subscriptionCover.url
                .replace('{w}x{h}', '800x800')
                .replace('{c}', '')
                .replace('{f}', 'webp');
          }

          if (item.attributes?.['editorialArtwork']?.superHeroWide?.url) {
            item.attributes['editorialArtwork'].superHeroWide.url =
              item.attributes?.['editorialArtwork']?.superHeroWide.url
                .replace('{w}x{h}', '800x800')
                .replace('{c}', '')
                .replace('{f}', 'webp');
          }
        }
        return data;
      }),
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

        if (firstItem && firstItem.attributes?.artwork?.url) {
          firstItem.attributes.artwork.url = firstItem.attributes?.artwork.url
            .replace('{w}x{h}', '1000x500')
            .replace('{f}', 'webp');
        }

        if (firstItem && firstItem?.views?.['similar-artists']) {
          for (const artist of firstItem.views['similar-artists'].data) {
            if (artist.attributes?.['artwork']?.url) {
              artist.attributes['artwork'].url = artist.attributes?.[
                'artwork'
              ].url
                .replace('{w}x{h}', '400x400')
                .replace('{f}', 'webp');
            }
          }
        }

        if (firstItem && firstItem?.views?.['latest-release']) {
          for (const artist of firstItem.views['latest-release'].data) {
            if (artist.attributes?.['artwork']?.url) {
              artist.attributes['artwork'].url = artist.attributes?.[
                'artwork'
              ].url
                .replace('{w}x{h}', '400x400')
                .replace('{f}', 'webp');
            }
          }
        }

        if (firstItem && firstItem?.views?.['featured-albums']) {
          for (const artist of firstItem.views['featured-albums'].data) {
            if (artist.attributes?.['artwork']?.url) {
              artist.attributes['artwork'].url = artist.attributes?.[
                'artwork'
              ].url
                .replace('{w}x{h}', '400x400')
                .replace('{f}', 'webp');
            }
          }
        }

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
            data: data.payload.data.relationships.grouping.data.map(
              (category) => {
                const transformedCategory = transformBrowseCategories(category);
                console.log(transformedCategory);
                return transformedCategory;
              }
            ),
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

// Listens to route changes and dispatches the appropriate actions
export const getMediaItemOnRouteChange$ = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store<SpinnerState>)) =>
    actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      map((router) => router.payload?.routerState?.root?.firstChild),
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
      ]),
      tap(() => store$.dispatch(SpinnerActions.hideSpinner()))
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
      // and replace the artwork url
      map((data) => {
        if (data.payload.data.attributes?.['artwork']?.url) {
          data.payload.data.attributes['artwork'].url = transformArtworkUrl(
            data.payload.data.attributes?.['artwork'].url,
            400
          );
        }
        return data;
      }),

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
              .then((data) => {
                // and replace the artwork url
                if (data.payload.data.attributes?.['artwork']?.url) {
                  data.payload.data.attributes['artwork'].url =
                    transformArtworkUrl(
                      data.payload.data.attributes?.['artwork'].url,
                      400
                    );
                }
                return data;
              })
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
              .then((data) => {
                // and replace the artwork url for songs and playlist
                if (data.payload.data.attributes?.artwork?.url) {
                  data.payload.data.attributes.artwork.url =
                    transformArtworkUrl(
                      data.payload.data.attributes.artwork.url,
                      400
                    );
                }

                if (data.payload.data.relationships.tracks.data) {
                  for (const track of data.payload.data.relationships.tracks
                    .data) {
                    if (track.attributes?.['artwork']?.url) {
                      track.attributes['artwork'].url = transformArtworkUrl(
                        track.attributes?.['artwork'].url,
                        400
                      );
                    }
                  }
                }
                return data;
              })
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
      mergeMap(() => [
        MusicAPIActions.getRecentlyPlayed(),
        MusicAPIActions.getRecommendations(),
      ]),
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
              map((browseCategories) => {
                return transformBrowseCategories(browseCategories);
              }),

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
      withLatestFrom(store.select(selectAllPersonalRecommendations)),
      switchMap(([, recommendationsStoreData]) =>
        recommendationsStoreData.length > 0
          ? of(
              MusicAPIActions.getRecommendationsSuccess({
                payload: { data: recommendationsStoreData },
              })
            )
          : from(musickit.getRecommendations()).pipe(
              // Convert images to webp
              map(async (recommendations) => {
                for (const recommendation of recommendations) {
                  for (const resource of recommendation.relationships?.contents
                    ?.data ?? []) {
                    if (resource.attributes?.['artwork']?.url) {
                      resource.attributes['artwork'].url = transformArtworkUrl(
                        resource.attributes?.['artwork']?.url,
                        160
                      );
                    }
                  }
                }
                return recommendations;
              }),
              //map promise to observable and emit
              switchMap((recommendations) => from(recommendations)),
              map((recommendations) =>
                MusicAPIActions.getRecommendationsSuccess({
                  payload: { data: recommendations },
                })
              )
            )
      )
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
              // Convert images to webp
              map((recentlyPlayed) => {
                for (const item of recentlyPlayed) {
                  if (item.attributes?.['artwork']?.url) {
                    item.attributes['artwork'].url = transformArtworkUrl(
                      item.attributes['artwork'].url,
                      230
                    );
                  }
                }
                return recentlyPlayed;
              }),
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
          ),
          catchError((error) =>
            of(MusicAPIActions.loveMediaItemFailure({ payload: { error } }))
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

// utility functions

interface RouteParameters {
  id: string;
  type: MediaItemTypes;
}

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

      newArtwork.url = transformArtworkUrl(newAttributes.artwork.url, 400);
      newAttributes.artwork = newArtwork;
      newNode.attributes = newAttributes;
    }

    for (const key in newNode) {
      if (newNode[key] instanceof Object) {
        newNode[key] = transformBrowseCategories(newNode[key]);
      }
    }

    return newNode;
  }
  return node;
};
