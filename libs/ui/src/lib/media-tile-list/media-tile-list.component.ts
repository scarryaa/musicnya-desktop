import { CommonModule } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChildren,
  ElementRef,
  QueryList,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { HeadingComponent } from '../heading/heading.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { AlbumTileLargeModule } from '../album-tile/album-tile-large.component';
import { AlbumTileLargeSmartModule } from '../album-tile/album-tile-large.smart.component';

@Component({
  selector: 'ui-media-tile-list',
  standalone: true,
  imports: [
    CommonModule,
    HeadingComponent,
    AlbumTileLargeSmartModule,
    DragScrollModule,
  ],
  template: ` <ui-heading id="heading" size="medium">{{
      listTitle
    }}</ui-heading>
    <drag-scroll
      passive
      id="media-items"
      #dragScroll
      [drag-scroll-y-disabled]="true"
      [scrollbar-hidden]="false"
      [snap-disabled]="true"
      (dragStart)="this.clickEnabled = false"
      (dragEnd)="this.clickEnabled = true"
    >
      <div>
        <ui-album-tile-large
          drag-scroll-item
          *ngFor="let item of [1, 2, 3, 4, 5, 6, 7, 8, 9]; let i = index"
          [id]="'media-item-' + i"
          #items
          [clickEnabled]="clickEnabled"
          mediaTitle="Test Album"
          artworkRouterLink="/media-details"
          imageSource="https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png"
        ></ui-album-tile-large>
      </div>
    </drag-scroll>`,
  styleUrls: ['./media-tile-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaTileListComponent {
  @ViewChildren('items', { read: ElementRef })
  mediaItems!: QueryList<ElementRef>;
  @Input() listTitle!: string;
  @Input() clickEnabled = true;
  @Output() readonly playEmitter: EventEmitter<{ album: string }> =
    new EventEmitter();
}
