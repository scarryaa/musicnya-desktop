import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { OptionsButtonComponent } from '../options-button/options-button.component';

@Component({
  selector: 'core-banner-hero-tile',
  standalone: true,
  imports: [CommonModule, PlayButtonComponent, OptionsButtonComponent],
  template: `
    <div class="info">
      <span class="banner-hero-tile__badge">{{ badge }}</span>
      <span class="banner-hero-tile__title">{{ title }}</span>
      <span class="banner-hero-tile__subtitle">{{ subtitle || ' ' }}</span>
    </div>
    <div
      class="banner-hero-tile"
      [style.background-blend-mode]="'overlay'"
      [style.background]="'url(' + image + ') no-repeat center center / cover'"
    >
      <div class="gradient"></div>
      <div class="overlay">
        <core-play-button
          (playEmitter)="playEmitter.emit({ type: type, id })"
        ></core-play-button>
        <core-options-button
          (optionsEmitter)="optionsEmitter.emit('')"
        ></core-options-button>
      </div>
      <span class="banner-hero-tile__description">{{ description }}</span>
    </div>
  `,
  styleUrls: ['./banner-hero-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerHeroTileComponent {
  @Input() badge?: string;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() description?: string;
  @Input() image?: string;
  @Input() type!: string;
  @Input() id!: string;

  @Output() playEmitter = new EventEmitter<{ type: string; id: string }>();
  @Output() optionsEmitter = new EventEmitter<string>();
}
