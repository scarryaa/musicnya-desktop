import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MusicKit } from '@nyan-inc/shared-types';
import { filter, map, Observable, skipWhile, Subscription, take } from 'rxjs';
import { MusicAPIActions } from '../actions';
import { MusicAPIState } from '../reducers/music-api.reducer';
import { selectAllCuratorCategories, selectAllPersonalRecommendations } from '../selectors';
import { selectAllBrowseCategories } from '../selectors/browse-categories.selectors';
import { selectAllLibraryPlaylists } from '../selectors/library-playlists.selectors';
import { selectMusicAPIState } from '../selectors/music-api.selectors';

@Injectable({
  providedIn: 'root',
})
export class MusicAPIFacade implements OnDestroy {
  subs = new Subscription();
  libraryPlaylists$ = this.store
    .select(selectAllLibraryPlaylists)
    .pipe(skipWhile((value) => value.length === 0));
  currentMedia$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(map((value) => value.currentMedia));
  musickitLoaded$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(map((value) => value.loaded));
  recommendations$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(map((value) => value.personalRecommendations));
  recentlyPlayed$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(map((value) => value.recentlyPlayed));
  state$ = this.store.pipe(select(selectMusicAPIState));
  type$ = this.store.pipe(select(selectMusicAPIState)).pipe(
    filter((value) => value.currentMedia?.type !== undefined),
    map((value) => value.currentMedia?.type)
  );
  loaded$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(map((value) => value.loaded));

  // media-details vm
  selectMedia$ = this.store.pipe(
    select(selectMusicAPIState),
    map((value) => value.currentMedia?.data)
  );

  //browse vm
  selectBrowseCategories$ = this.store.pipe(
    select(selectAllBrowseCategories),
    filter((categories) => categories !== undefined)
  );

  selectEditorialElements$ = this.store.pipe(
    select(selectAllBrowseCategories),
    map((categories) => categories?.[0]?.relationships.tabs.data?.[0])
  );

  selectEditorialElementsData$ = this.store.pipe(
    select(selectAllBrowseCategories),
    map(
      (categories) =>
        categories?.[0]?.relationships.tabs.data?.[0]?.relationships.children
          .data
    )
  );

  // home vm
  selectRecommendations$: Observable<MusicKit.Resource[]> = this.store.pipe(
    select(selectAllPersonalRecommendations),
    filter((recommendations) => recommendations !== undefined)
  );

  getCurator(id: string) {
    this.store.dispatch(MusicAPIActions.getCuratorID({ payload: { id } }));
  }

  // curator selectors
  readonly curatorName$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(map((value) => value.currentMedia?.data?.attributes?.['name']));

  readonly curatorID$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(map((value) => value.currentMedia?.data?.id));

  readonly curatorBanner$ = this.store.pipe(select(selectMusicAPIState)).pipe(
    filter((value: MusicAPIState) => value && value.currentMedia !== undefined),
    map(
      (value: MusicAPIState) =>
        value.currentMedia?.data?.attributes?.['editorialArtwork']
          ?.superHeroWide?.url ||
        value.currentMedia?.data?.attributes?.['editorialArtwork']
          ?.staticDetailSquare?.url ||
        value.currentMedia?.data?.attributes?.['editorialArtwork']
          ?.storeFlowcase?.url ||
        '' ||
        value.currentMedia?.data?.attributes?.['artwork']?.url
    )
  );

  curatorData$ = this.store.pipe(
    select(selectAllCuratorCategories),
    map(
      (categories) =>
        categories?.[0]?.relationships.tabs.data?.[0]?.relationships.children
          .data
    )
  );

  readonly curatorPlaylists$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(map((value) => value.currentMedia?.data?.relationships?.playlists));

  readonly curatorFeatured$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(map((value) => value.currentMedia?.data?.relationships?.featured));

  // artist selectors
  readonly artistName$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(map((value) => value.currentMedia?.data?.attributes?.['name']));

  readonly artistID$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(map((value) => value.currentMedia?.data?.id));

  readonly artistStationID$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(
      map(
        (value) =>
          value.currentMedia?.data?.relationships?.station?.data?.[0]?.id
      )
    );

  readonly artistTopSongs$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(map((value) => value.currentMedia?.data?.views?.['top-songs']?.data));

  readonly featuredAlbums$ = this.store.pipe(select(selectMusicAPIState)).pipe(
    filter((value: MusicAPIState) => value && value.currentMedia !== undefined),
    filter(
      (value: MusicAPIState) =>
        value.currentMedia?.data?.views?.['latest-release'] !== undefined ||
        value.currentMedia?.data?.views?.['featured-albums'] !== undefined
    ),
    map((value: MusicAPIState) =>
      (
        value.currentMedia?.data?.views?.['latest-release']?.data ||
        value.currentMedia?.data?.views?.['featured-albums']?.data
      )?.filter(
        (album: any, index: number, self: any) =>
          !album.attributes?.isSingle &&
          !album.attributes?.isCompilation &&
          !album.attributes.name.toLowerCase().includes('- single') &&
          !album.attributes.name.toLowerCase().includes('- ep') &&
          self.findIndex(
            (t: any) => t.attributes.name === album.attributes.name
          ) === index
      )
    )
  );

  readonly featuredAlbumLink$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(
      map(
        (value) =>
          '/media/albums/' +
            value.currentMedia?.data?.views?.['latest-release']?.data?.[0]
              ?.id ||
          value.currentMedia?.data?.views?.['featured-albums']?.data?.[0]?.id
      )
    );

  readonly featuredReason$ = this.store.pipe(select(selectMusicAPIState)).pipe(
    filter((value: MusicAPIState) => value && value.currentMedia !== undefined),
    filter(
      (value: MusicAPIState) =>
        value.currentMedia?.data?.views?.['latest-release'] !== undefined ||
        value.currentMedia?.data?.views?.['featured-albums'] !== undefined
    ),
    map(
      (value: MusicAPIState) =>
        value.currentMedia?.data?.views?.['latest-release']?.attributes?.[
          'title'
        ] ||
        value.currentMedia?.data?.views?.['featured-albums']?.attributes?.[
          'title'
        ]
    )
  );

  readonly featuredTrackCount$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(
      filter(
        (value: MusicAPIState) => value && value.currentMedia !== undefined
      ),
      filter(
        (value: MusicAPIState) =>
          value.currentMedia?.data?.views?.['latest-release'] !== undefined ||
          value.currentMedia?.data?.views?.['featured-albums'] !== undefined
      ),
      map(
        (value: MusicAPIState) =>
          value.currentMedia?.data?.views?.['latest-release']?.data[0]
            ?.attributes?.trackCount ||
          value.currentMedia?.data?.views?.['featured-albums']?.data[0]
            ?.attributes?.trackCount
      )
    );

  readonly artistAlbums$ = this.store.pipe(select(selectMusicAPIState)).pipe(
    filter((value: MusicAPIState) => value && value.currentMedia !== undefined),
    map((value: MusicAPIState) =>
      value.currentMedia?.data?.relationships?.albums?.data?.filter(
        (album: any, index: number, self: any) =>
          !album.attributes?.isSingle &&
          !album.attributes?.isCompilation &&
          !album.attributes.name.toLowerCase().includes('- single') &&
          !album.attributes.name.toLowerCase().includes('- ep') &&
          self.findIndex(
            (t: any) => t.attributes.name === album.attributes.name
          ) === index
      )
    )
  );

  readonly artistSingles$ = this.store.pipe(select(selectMusicAPIState)).pipe(
    filter((value: MusicAPIState) => value && value.currentMedia !== undefined),
    map((value: MusicAPIState) =>
      value.currentMedia?.data?.relationships?.albums?.data?.filter(
        (album: any, index: number, self: any) =>
          (album.attributes?.isSingle ||
            album.attributes.name.toLowerCase().includes('- single') ||
            album.attributes.name.toLowerCase().includes('- ep')) &&
          self.findIndex(
            (t: any) => t.attributes.name === album.attributes.name
          ) === index
      )
    )
  );

  readonly artistMusicVideos$ = this.store
    .pipe(select(selectMusicAPIState))
    .pipe(
      filter(
        (value: MusicAPIState) => value && value.currentMedia !== undefined
      ),
      map((value: MusicAPIState) =>
        value.currentMedia?.data?.relationships?.['music-videos']?.data?.filter(
          (video: any, index: number, self: any) =>
            self.findIndex((t: any) => t.id === video.id) === index
        )
      )
    );

  readonly artistPlaylists$ = this.store.pipe(select(selectMusicAPIState)).pipe(
    filter((value: MusicAPIState) => value && value.currentMedia !== undefined),
    map(
      (value: MusicAPIState) =>
        value.currentMedia?.data?.relationships?.playlists?.data?.filter(
          (playlist: any, index: number, self: any) =>
            self.findIndex((t: any) => t.id === playlist.id) === index
        ) || []
    )
  );

  readonly similarArtists$ = this.store.pipe(select(selectMusicAPIState)).pipe(
    filter((value: MusicAPIState) => value && value.currentMedia !== undefined),
    map(
      (value: MusicAPIState) =>
        value.currentMedia?.data?.views?.['similar-artists']?.data?.filter(
          (artist: any, index: number, self: any) =>
            self.findIndex((t: any) => t.id === artist.id) === index
        ) || []
    )
  );

  readonly artistBanner$ = this.store.pipe(select(selectMusicAPIState)).pipe(
    filter((value: MusicAPIState) => value && value.currentMedia !== undefined),
    map(
      (value: MusicAPIState) =>
        value.currentMedia?.data?.attributes?.['editorialArtwork']?.bannerUber
          ?.url ||
        value.currentMedia?.data?.attributes?.['artwork']?.url ||
        value.currentMedia?.data?.attributes?.['editorialArtwork']
          ?.storeFlowcase?.url ||
        ''
    )
  );

  readonly getRatings$ = this.store.pipe(select(selectMusicAPIState)).pipe(
    filter((state) => state !== undefined),
    map((state) => state.ratings)
  );

  // readonly getLibraryAlbums$ = this.store
  //   .pipe(select(selectMusicAPIState))
  //   .pipe(
  //     filter((state) => state !== undefined),
  //     // filter only albums
  //     map((state) =>
  //       state.currentMedia?.relationships?.albums?.data?.filter(
  //         (album: any) => album.type === 'library-albums'
  //       )
  //     )
  //   );

  // readonly getLibraryArtists$ = this.store
  //   .pipe(select(selectMusicAPIState))
  //   .pipe(
  //     filter((state) => state !== undefined),
  //     // filter only artists
  //     map((state) =>
  //       state.currentMedia?.relationships?.artists?.data?.filter(
  //         (artist: any) => artist.type === 'library-artists'
  //       )
  //     )
  //   );

  // readonly getLibrarySongs$ = this.store
  //   .pipe(select(selectMusicAPIState))
  //   .pipe(
  //     filter((state) => state !== undefined),
  //     // filter only songs
  //     map((state) =>
  //       state.currentMedia?.relationships?.songs?.data?.filter(
  //         (song: any) => song.type === 'library-songs'
  //       )
  //     )
  //   );

  constructor(private readonly store: Store<MusicAPIState>) {}

  ngOnDestroy() {
    return this.subs.unsubscribe();
  }

  love(event: { type: string; id: string }) {
    return this.store.dispatch(
      MusicAPIActions.loveMediaItem({
        payload: { type: event.type as MusicKit.MediaItemType, id: event.id },
      })
    );
  }

  loadAPI() {
    return this.store.dispatch(MusicAPIActions.loadMusicAPI());
  }

  getArtist(id: string) {
    return this.store.dispatch(
      MusicAPIActions.getArtist({ payload: { artistId: id } })
    );
  }

  getRecommendations() {
    return this.subs.add(
      this.state$.subscribe(() =>
        this.store.dispatch(MusicAPIActions.getRecommendations())
      )
    );
  }

  getRecommendationsAndRecentlyPlayed() {
    return this.musickitLoaded$
      .pipe(
        skipWhile((loaded) => loaded !== true),
        take(1)
      )
      .subscribe(() =>
        this.store.dispatch(
          MusicAPIActions.getRecommendationsAndRecentlyPlayed()
        )
      );
  }

  getBrowseCategories() {
    return this.musickitLoaded$
      .pipe(
        skipWhile((loaded) => loaded !== true),
        take(1)
      )
      .subscribe(() =>
        this.store.dispatch(MusicAPIActions.getBrowseCategories())
      );
  }

  getLibraryPlaylists() {
    return this.musickitLoaded$
      .pipe(
        skipWhile((loaded) => loaded !== true),
        take(1)
      )
      .subscribe(() =>
        this.store.dispatch(MusicAPIActions.getLibraryPlaylists())
      );
  }
}
