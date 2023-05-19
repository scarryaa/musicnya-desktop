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
import { AppEffects } from '../store/effects/app.effects';
import { appRoutes } from './app.routes';
import * as fromApp from '../store/reducers/app.reducer';
import * as fromLayout from '../store/reducers/layout.reducer';
import * as fromMusickit from '@nyan-inc/musickit-typescript';
import { BrowserModule } from '@angular/platform-browser';
import '@angular/compiler';
import {
  MusickitHttpInterceptor,
  MusickitStoreModule,
} from '@nyan-inc/musickit-typescript';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

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
    importProvidersFrom(MusickitStoreModule),
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
        musickit: fromMusickit.musickitReducer,
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
    provideStoreDevtools({ maxAge: 25, trace: true, traceLimit: 20 }),
    provideRouterStore(),
    provideState(fromLayout.LAYOUT_FEATURE_KEY, fromLayout.layoutReducer),
    provideEffects([AppEffects]),
  ],
};
