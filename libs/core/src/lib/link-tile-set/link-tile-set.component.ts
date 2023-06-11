import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkTileComponent } from '../link-tile/link-tile.component';
import { MusicKit } from '@nyan-inc/shared-types';

@Component({
  selector: 'core-link-tile-set',
  standalone: true,
  imports: [CommonModule, LinkTileComponent],
  template: `<div class="link-tile-set">
    <ng-container *ngFor="let link of links">
      <core-link-tile
        [link]="link.url"
        [external]="link.target === 'external'"
        >{{ link.label }}</core-link-tile
      >
    </ng-container>
  </div>`,
  styleUrls: ['./link-tile-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkTileSetComponent {
  @Input() links?: MusicKit.EditorialLinks[];
}
