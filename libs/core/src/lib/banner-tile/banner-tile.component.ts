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
  selector: 'core-banner-tile',
  standalone: true,
  imports: [CommonModule, PlayButtonComponent, OptionsButtonComponent],
  template: `<div
      class="banner-tile"
      [style.background]="
        'url(' + image + ') no-repeat center center / cover !important'
      "
    >
      <div class="banner-tile__overlay">
        <core-play-button
          (playEmitter)="playEmitter.emit({ type: type, id })"
        ></core-play-button>
        <core-options-button
          (optionsEmitter)="optionsEmitter.emit('')"
        ></core-options-button>
      </div>
    </div>
    <span class="banner-tile__title">
      <ng-content></ng-content>
    </span>`,
  styleUrls: ['./banner-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerTileComponent {
  @Input() image?: string;
  @Input() type!: string;
  @Input() id!: string;

  @Output() playEmitter = new EventEmitter<{ type: string; id: string }>();
  @Output() optionsEmitter = new EventEmitter<string>();
}
