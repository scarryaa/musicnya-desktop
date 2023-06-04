/* eslint-disable functional/prefer-immutable-types */
import { Injectable, OnDestroy } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { MediaItemTypes } from '@nyan-inc/core';
import { filter, map, skipWhile, Subscription, take, tap } from 'rxjs';
import { MusicAPIActions } from '../actions';
import { fromMusicAPI } from '../reducers';
import { MusicAPIState } from '../reducers/music-api.reducer';

@Injectable({
  providedIn: 'root',
})
export class MusicAPIFacade implements OnDestroy {
  readonly subs = new Subscription();
  readonly libraryPlaylists$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.libraryPlaylists));
  readonly currentMedia$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.currentMedia));
  readonly musickitLoaded$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.loaded));
  readonly recommendations$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.homeTileLists[1]));
  readonly recentlyPlayed$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.homeTileLists[0]));
  readonly state$ = this.store.pipe(select(fromMusicAPI.getMusicAPIState));
  readonly type$ = this.store.pipe(select(fromMusicAPI.getMusicAPIState)).pipe(
    filter((value) => value.currentMediaType !== undefined),
    map((value) => value.currentMedia?.type)
  );
  readonly loaded$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.loaded));

  // artist selectors

  readonly artistName$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.currentMedia?.attributes?.name));

  readonly artistID$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.currentMedia?.id));

  readonly artistStationID$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(
      map((value) => value.currentMedia?.relationships?.station?.data?.[0]?.id)
    );

  readonly artistTopSongs$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.currentMedia?.views?.['top-songs']?.data));

  readonly featuredAlbums$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(
      filter(
        (value: MusicAPIState) => value && value.currentMedia !== undefined
      ),
      filter(
        (value: MusicAPIState) =>
          value.currentMedia?.views?.['latest-release'] !== undefined ||
          value.currentMedia?.views?.['featured-albums'] !== undefined
      ),
      map((value: MusicAPIState) =>
        (
          value.currentMedia?.views?.['latest-release']?.data ||
          value.currentMedia?.views?.['featured-albums']?.data
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
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(
      map(
        (value) =>
          '/media/albums/' +
            value.currentMedia?.views?.['latest-release']?.data?.[0]?.id ||
          value.currentMedia?.views?.['featured-albums']?.data?.[0]?.id
      )
    );

  readonly featuredReason$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(
      filter(
        (value: MusicAPIState) => value && value.currentMedia !== undefined
      ),
      filter(
        (value: MusicAPIState) =>
          value.currentMedia?.views?.['latest-release'] !== undefined ||
          value.currentMedia?.views?.['featured-albums'] !== undefined
      ),
      map(
        (value: MusicAPIState) =>
          value.currentMedia?.views?.['latest-release']?.attributes?.[
            'title'
          ] ||
          value.currentMedia?.views?.['featured-albums']?.attributes?.['title']
      )
    );

  readonly featuredTrackCount$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(
      filter(
        (value: MusicAPIState) => value && value.currentMedia !== undefined
      ),
      filter(
        (value: MusicAPIState) =>
          value.currentMedia?.views?.['latest-release'] !== undefined ||
          value.currentMedia?.views?.['featured-albums'] !== undefined
      ),
      map(
        (value: MusicAPIState) =>
          value.currentMedia?.views?.['latest-release']?.data[0]?.attributes
            ?.trackCount ||
          value.currentMedia?.views?.['featured-albums']?.data[0]?.attributes
            ?.trackCount
      )
    );

  readonly artistAlbums$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(
      filter(
        (value: MusicAPIState) => value && value.currentMedia !== undefined
      ),
      map((value: MusicAPIState) =>
        value.currentMedia?.relationships?.albums?.data?.filter(
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

  readonly artistSingles$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(
      filter(
        (value: MusicAPIState) => value && value.currentMedia !== undefined
      ),
      map((value: MusicAPIState) =>
        value.currentMedia?.relationships?.albums?.data?.filter(
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
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(
      filter(
        (value: MusicAPIState) => value && value.currentMedia !== undefined
      ),
      map((value: MusicAPIState) =>
        value.currentMedia?.relationships?.['music-videos']?.data?.filter(
          (video: any, index: number, self: any) =>
            self.findIndex((t: any) => t.id === video.id) === index
        )
      )
    );

  readonly artistPlaylists$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(
      filter(
        (value: MusicAPIState) => value && value.currentMedia !== undefined
      ),
      map(
        (value: MusicAPIState) =>
          value.currentMedia?.relationships?.playlists?.data?.filter(
            (playlist: any, index: number, self: any) =>
              self.findIndex((t: any) => t.id === playlist.id) === index
          ) || []
      )
    );

  readonly similarArtists$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(
      filter(
        (value: MusicAPIState) => value && value.currentMedia !== undefined
      ),
      map(
        (value: MusicAPIState) =>
          value.currentMedia?.views?.['similar-artists']?.data?.filter(
            (artist: any, index: number, self: any) =>
              self.findIndex((t: any) => t.id === artist.id) === index
          ) || []
      )
    );

  readonly artistBanner$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(
      filter(
        (value: MusicAPIState) => value && value.currentMedia !== undefined
      ),
      map(
        (value: MusicAPIState) =>
          value.currentMedia?.attributes?.editorialArtwork?.bannerUber?.url ||
          value.currentMedia?.attributes?.artwork?.url ||
          value.currentMedia?.attributes?.editorialArtwork?.storeFlowcase
            ?.url ||
          ''
      )
    );

  // Other selectors
  readonly getRatings$ = this.store.pipe(select(fromMusicAPI.getRatings)).pipe(
    filter((value) => value !== undefined),
    map((value) => value)
  );

  // media selectors/filters
  readonly getLibraryPlaylists$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(
      // filter only playlists
      // TODO convert to a shared library collection
      filter(
        (state) => state !== undefined && state.libraryPlaylists !== undefined
      ),
      map((state) => state.libraryPlaylists)
    );

  // readonly getLibraryAlbums$ = this.store
  //   .pipe(select(fromMusicAPI.getMusicAPIState))
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
  //   .pipe(select(fromMusicAPI.getMusicAPIState))
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
  //   .pipe(select(fromMusicAPI.getMusicAPIState))
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
        payload: { type: event.type as MediaItemTypes, id: event.id },
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
