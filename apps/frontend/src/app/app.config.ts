import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withRouterConfig,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { appRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import '@angular/compiler';
import {
  AppEffects,
  MusicAPIEffects,
  MusicEffects,
  PreferencesEffects,
  fromApp,
  fromLayout,
  fromMusic,
} from '@nyan-inc/shared/data-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withHashLocation(),
      withRouterConfig({ urlUpdateStrategy: 'deferred' })
    ),
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
        layout: fromLayout.layoutReducer,
        music: fromMusic.musicReducer,
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
    provideStoreDevtools({ maxAge: 25, trace: true, traceLimit: 20 }),
    provideRouterStore(),
    provideState(fromLayout.LAYOUT_FEATURE_KEY, fromLayout.layoutReducer),
    provideState(fromApp.APP_FEATURE_KEY, fromApp.appReducer),
  ],
};
