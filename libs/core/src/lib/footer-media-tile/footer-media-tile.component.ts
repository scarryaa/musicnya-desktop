import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'core-footer-media-tile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<div class="footer-media-tile-wrapper">
    <div class="footer-media-tile">
      <div
        class="footer-media-tile__expand-button-overlay"
        (click)="handleExpandClick()"
      >
        <i
          class="footer-media-tile__expand-button-overlay__expand-button material-symbols-rounded"
        >
          expand_less
        </i>
      </div>
      <div class="footer-media-tile__image-wrapper" [routerLink]="mediaLink">
        <img
          class="footer-media-tile__image-wrapper__image"
          [src]="mediaImage"
          [style.minWidth.rem]="mediaImageSize"
          [style.minHeight.rem]="mediaImageSize"
          [style.aspectRatio]="1"
        />
      </div>
      <div class="footer-media-tile__text">
        <div
          class="footer-media-tile__text__title"
          [title]="mediaTitle"
          [routerLink]="mediaLink"
        >
          {{ mediaTitle }}
        </div>
        <div
          class="footer-media-tile__text__subtitle"
          [title]="mediaSubtitle"
          [routerLink]="mediaSubtitleLink"
        >
          {{ mediaSubtitle }}
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['./footer-media-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterMediaTileComponent {
  @Input() mediaImage?: string = undefined;
  @Input() mediaImageSize?: number = undefined;
  @Input() mediaLink?: string;
  @Input() mediaSubtitleLink?: string;
  @Input() mediaTitle?: string = undefined;
  @Input() mediaSubtitle?: string = undefined;

  @Output() expandEmitter = new EventEmitter();

  handleExpandClick(event?: MouseEvent) {
    event?.stopImmediatePropagation();
    this.expandEmitter.emit();
  }
}
