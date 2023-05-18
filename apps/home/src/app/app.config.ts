import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { MusickitHttpInterceptor } from '@nyan-inc/musickit-ts';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MusickitHttpInterceptor,
      multi: true,
    },
    importProvidersFrom(HttpClientModule),
  ],
};
