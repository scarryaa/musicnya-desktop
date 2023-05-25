import '@angular/compiler';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { RemoteEntryComponent } from './app/remote-entry/entry.component';
import { appRoutes } from './app/app.routes';

void bootstrapApplication(RemoteEntryComponent, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  providers: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    importProvidersFrom(
      RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' })
    ),
  ],
});
