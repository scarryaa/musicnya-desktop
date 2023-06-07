import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'library-library-playlists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library-playlists.component.html',
  styleUrls: ['./library-playlists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPlaylistsComponent {}
