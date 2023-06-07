import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'library-library-albums',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library-albums.component.html',
  styleUrls: ['./library-albums.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryAlbumsComponent {}
