import { Route } from '@angular/router';
import { LibraryAlbumsComponent } from '../library-albums/library-albums.component';
import { LibraryArtistsComponent } from '../library-artists/library-artists.component';
import { LibraryPlaylistsComponent } from '../library-playlists/library-playlists.component';
import { LibrarySongsComponent } from '../library-songs/library-songs.component';

export const remoteRoutes: Route[] = [
  { path: 'playlists', component: LibraryPlaylistsComponent },
  { path: 'songs', component: LibrarySongsComponent },
  { path: 'albums', component: LibraryAlbumsComponent },
  { path: 'artists', component: LibraryArtistsComponent },
];
