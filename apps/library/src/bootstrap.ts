import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { RemoteEntryComponent } from './app/remote-entry copy/entry.component';

bootstrapApplication(RemoteEntryComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' })
    ),
  ],
});
