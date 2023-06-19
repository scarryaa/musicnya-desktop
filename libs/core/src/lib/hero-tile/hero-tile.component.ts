import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatImageURLPipe } from "../formatImageURL/format-image-url.pipe";

@Component({
    selector: 'core-hero-tile',
    standalone: true,
    template: `<div
    class="hero-tile"
    [style.backgroundImage]="'url(' + ((image || '') | formatImageURL: 600) + ')'"
  >
    <div class="hero-tile__content">
      <div class="hero-tile__title">{{ title }}</div>
      <div class="hero-tile__subtitle">{{ subtitle }}</div>
    </div>
  </div>`,
    styleUrls: ['./hero-tile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormatImageURLPipe]
})
export class HeroTileComponent {
  @Input() image?: string;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() width?: number;
  @Input() height?: number;
}
