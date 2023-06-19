import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { FormatImageURLPipe } from "../formatImageURL/format-image-url.pipe";

@Component({
    selector: 'core-artist-tile',
    standalone: true,
    template: `<div class="artist-tile-wrapper">
    <div class="artist-tile">
      <div class="artist-tile__image-wrapper">
        <img [src]="(image || '') | formatImageURL: 250" class="artist-tile-wrapper__image-wrapper__image" />
        <div
          class="artist-tile-wrapper__image-overlay"
          [routerLink]="artistLink"
        >
          <core-play-button (playEmitter)="handlePlay()"></core-play-button>
        </div>
      </div>
      <p [routerLink]="artistLink">{{ name }}</p>
    </div>
  </div>`,
    styles: [
        `
      :host {
        display: block;
        position: relative;

        &:hover {
          .artist-tile-wrapper__image-overlay {
            display: block !important;
          }
        }
      }

      .artist-tile-wrapper {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-self: flex-start;
      }

      .artist-tile {
        flex: 1;
        align-self: flex-start;
        position: relative;

        .artist-tile__image-wrapper {
          position: relative;
          width: 100%;
          border-radius: 8px;

          .artist-tile-wrapper__image-overlay {
            display: none;
            position: absolute;
            width: 100%;
            height: calc(100% - 0.8rem);
            top: 0;
            bottom: 0;
            background-color: oklch(0 0 0 / 40%);
            border-radius: 8px;
            overflow: hidden;
            border-radius: 50%;
          }

          .artist-tile-wrapper__image-wrapper__image {
            aspect-ratio: 1 / 1;
            object-fit: cover;
            flex: 1;
            background: var(--backgroundColor, black);
            border-radius: 50%;
            height: 8vw;
            margin-bottom: 0.5rem;
            flex: 1 1 0px;
            filter: drop-shadow(0 0 10px oklch(0% 0 0 / 30%));
          }
        }
      }

      p {
        font-weight: var(--font-weight-very-bold);
        filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.3));
        color: var(--textColor);
        text-align: center;
        margin: 0;
        overflow: hidden;

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, PlayButtonComponent, FormatImageURLPipe]
})
export class ArtistTileComponent {
  @Input() name = '';
  @Input() image = '';
  @Input() tileSize = 8;
  @Input() artistLink?: string;
  @Input() type = 'artists';
  @Input() id?: string;
  @Input() stationId?: string;

  @Output() playEmitter = new EventEmitter<{ type: string; id: string }>();

  handlePlay() {
    this.playEmitter.emit({ type: 'stations', id: this.stationId! });
  }
}
