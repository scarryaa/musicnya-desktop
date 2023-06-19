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
import { FormatImageURLPipe } from "../formatImageURL/format-image-url.pipe";

@Component({
    selector: 'core-banner-hero-tile',
    standalone: true,
    template: `
    <div class="info">
      <span class="banner-hero-tile__badge">{{ badge }}</span>
      <span class="banner-hero-tile__title">{{ title }}</span>
      <span class="banner-hero-tile__subtitle">{{ subtitle || ' ' }}</span>
    </div>
    <div
      class="banner-hero-tile"
      [style.background-blend-mode]="'overlay'"
      [style.background]="'url(' + ((image || '') | formatImageURL: 1200 ) + ') no-repeat center center / cover'"
    >
      <div class="gradient"></div>
      <div class="overlay" (click)="handleClick()">
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
    imports: [CommonModule, PlayButtonComponent, OptionsButtonComponent, FormatImageURLPipe]
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
  @Output() clickEmitter = new EventEmitter<{ type: string; id: string }>();

  handleClick() {
    console.log('handleClick', this.type, this.id);
    this.clickEmitter.emit({ type: this.type, id: this.id });
  }
}
