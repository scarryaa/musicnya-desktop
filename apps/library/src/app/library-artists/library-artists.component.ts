import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'library-library-artists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library-artists.component.html',
  styleUrls: ['./library-artists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryArtistsComponent {}
