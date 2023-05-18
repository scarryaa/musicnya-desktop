import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { RemoteEntryComponent } from './app/remote-entry/entry.component';
import { appRoutes } from './app/app.routes';

void bootstrapApplication(RemoteEntryComponent, {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation())],
});
