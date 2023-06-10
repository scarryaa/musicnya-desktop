import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-hero-tile',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    class="hero-tile"
    [style.backgroundImage]="'url(' + image + ')'"
  >
    <div class="hero-tile__content">
      <div class="hero-tile__title">{{ title }}</div>
      <div class="hero-tile__subtitle">{{ subtitle }}</div>
    </div>
  </div>`,
  styleUrls: ['./hero-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroTileComponent {
  @Input() image?: string;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() width?: number;
  @Input() height?: number;
}
