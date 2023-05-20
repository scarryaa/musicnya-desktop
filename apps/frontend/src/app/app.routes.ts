import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('../../../home/src/app/remote-entry/entry.routes').then(
        (m) => m.remoteRoutes
      ),
  },
  {
    path: 'media/:type/:id',
    loadChildren: () =>
      import('../../../media-details/src/app/remote-entry/entry.routes').then(
        (m) => m.remoteRoutes
      ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('../../../search/src/app/remote-entry/entry.routes').then(
        (m) => m.remoteRoutes
      ),
  },
];
