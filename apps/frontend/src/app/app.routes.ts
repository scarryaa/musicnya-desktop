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
    path: 'media/artists/:id',
    loadChildren: () =>
      import('artist-details/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'media/curators/:id',
    loadChildren: () =>
      import('../../../curator-details/src/app/remote-entry/entry.routes').then(
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
    path: 'library',
    loadChildren: () =>
      import('../../../library/src/app/remote-entry/entry.routes').then(
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
  {
    path: 'browse',
    loadChildren: () => import('browse/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'radio',
    loadChildren: () => import('radio/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('../../../settings/src/app/remote-entry/entry.routes').then(
        (m) => m.remoteRoutes
      ),
  },
];
