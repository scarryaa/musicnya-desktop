import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Songs } from '../models/music.types';
import { AlbumTileModule } from '../album-tile/album-tile.component';
import { MediaTileSmallComponent } from '../media-tile-small/media-tile-small.component';
import { DividerComponent } from '../divider/divider.component';

@Component({
  selector: 'core-top-songs',
  standalone: true,
  imports: [
    CommonModule,
    AlbumTileModule,
    MediaTileSmallComponent,
    DividerComponent,
  ],
  template: ` <div class="flex-container">
    <p *ngIf="showTitle" id="container-title">Top Songs</p>
    <core-divider></core-divider>
    <div class="content-container">
      <div *ngFor="let media of songs; let i = index" class="tile-container">
        <core-media-tile-small
          [mediaImage]="media.attributes?.artwork?.url ?? ''"
          [mediaTitle]="media.attributes?.name ?? ''"
          [mediaSubtitle]="media.attributes?.artistName"
          [mediaImageSize]="3"
        >
        </core-media-tile-small>
      </div>
    </div>
  </div>`,
  styles: [
    `
      :host {
        width: 100%;

        .flex-container {
          display: flex;
          flex-direction: row;
        }

        #container-title {
          max-height: 1.5rem;
          width: 1.5rem;
          position: relative;
          display: block;
          align-self: center;
          white-space: pre-wrap;
          margin-right: 2rem;
        }

        .content-container {
          margin-top: 1rem;
          padding-inline: 1rem;
          padding-left: 0;
          padding-right: 2rem;
          display: flex;
          gap: 1rem;
          overflow: scroll;

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }

      p {
        text-align: left;
        margin: 0;
        margin-bottom: 1.5rem;
      }

      ::ng-deep .tile-container {
        margin-inline: 0.5rem;

        > ui-album-tile > core-base-button {
          #artwork {
            max-width: 2.5rem;
          }

          #album-info span {
            max-width: 10rem !important;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
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
