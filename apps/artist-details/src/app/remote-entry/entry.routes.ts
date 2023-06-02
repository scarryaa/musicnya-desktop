import { Route } from '@angular/router';
import { artistDetailsGuard } from '../guards/artist-details.guard';
import { RemoteEntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    canActivate: [artistDetailsGuard],
    component: RemoteEntryComponent,
  },
];
