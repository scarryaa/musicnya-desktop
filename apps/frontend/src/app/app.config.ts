import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  RouteReuseStrategy,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withRouterConfig,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { appRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import '@angular/compiler';
import {
  fromMusic,
  fromMusicAPI,
  MusicAPIEffects,
  MusicEffects,
  PreferencesEffects,
} from '@nyan-inc/shared';
import * as fromApp from '../store/reducers/app.reducer';
import * as fromLayout from '../store/reducers/layout.reducer';
import { AppEffects } from '../store/effects/app.effects';
import { CacheRouteReuseStrategy } from '@nyan-inc/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withHashLocation(),
      withRouterConfig({
        urlUpdateStrategy: 'deferred',
        onSameUrlNavigation: 'ignore',
      })
    ),
    {
      provide: RouteReuseStrategy,
      useClass: CacheRouteReuseStrategy,
    },
    provideRouterStore(),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(
      NgScrollbarModule.withConfig({
        visibility: 'hover',
        appearance: 'compact',
        trackClass: 'track-margin',
      })
    ),
    provideStore(
      {
        app: fromApp.appReducer,
        router: routerReducer,
        layout: fromLayout.layoutReducer,
        music: fromMusic.musicReducer,
        musicApi: fromMusicAPI.musicAPIReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
        },
      }
    ),
    provideEffects([
      AppEffects,
      MusicEffects,
      MusicAPIEffects,
      PreferencesEffects,
    ]),
    provideState(fromLayout.LAYOUT_FEATURE_KEY, fromLayout.layoutReducer),
    provideState(fromApp.APP_FEATURE_KEY, fromApp.appReducer),
    provideState(fromMusic.MUSIC_FEATURE_KEY, fromMusic.musicReducer),
    provideState(
      fromMusicAPI.MusicAPI_API_FEATURE_KEY,
      fromMusicAPI.musicAPIReducer
    ),
  ],
};
