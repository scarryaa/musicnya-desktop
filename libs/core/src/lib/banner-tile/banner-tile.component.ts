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
import { FormatImageURLPipe } from '../formatImageURL/format-image-url.pipe';
import { RoomType } from '../room-type.pipe';
import { MusicKit } from '@nyan-inc/shared-types';

@Component({
  selector: 'core-banner-tile',
  standalone: true,
  template: `<div
      class="banner-tile"
      [style.background]="
        'url(' +
        (image || '' | formatImageURL : 600) +
        ') no-repeat center center / cover !important'
      "
    >
      <div
        class="banner-tile__overlay"
        (click)="
          hasRoom ? clickEmitter.emit({ id: id, type: roomType }) : undefined
        "
      >
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
  imports: [
    CommonModule,
    PlayButtonComponent,
    OptionsButtonComponent,
    FormatImageURLPipe,
  ],
})
export class BannerTileComponent {
  @Input() roomType?: string | undefined;
  @Input() image?: string;
  @Input() type!: string;
  @Input() id!: string;
  @Input() hasRoom?: string;

  @Output() playEmitter = new EventEmitter<{ type: string; id: string }>();
  @Output() optionsEmitter = new EventEmitter<string>();
  @Output() clickEmitter = new EventEmitter<{
    id: string;
    type: string | undefined;
  }>();
}
