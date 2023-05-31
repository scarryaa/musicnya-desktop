import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaTableSmallComponent } from '../media-table-small/media-table-small.component';
import { Songs } from '../models/music.types';

@Component({
  selector: 'core-top-songs',
  standalone: true,
  imports: [CommonModule, MediaTableSmallComponent],
  template: `<p *ngIf="showTitle">Top Songs</p>
    <core-media-table-small
      [songs]="songs"
      [index]="index"
      [rows]="rows"
    ></core-media-table-small>`,
  styles: [
    `
      :host {
        width: 17rem;
      }

      p {
        text-align: left;
        margin: 0;
        margin-bottom: 0.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopSongsComponent {
  @Input() songs!: Songs[];
  @Input() index: number = 0;
  @Input() rows: number = 3;
  @Input() showTitle = true;
}
