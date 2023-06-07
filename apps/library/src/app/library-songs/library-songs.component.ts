import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'library-library-songs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library-songs.component.html',
  styleUrls: ['./library-songs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibrarySongsComponent {}
