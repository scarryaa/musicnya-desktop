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
  template: `<ui-heading id="heading" size="medium">{{ listTitle }}</ui-heading>
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
      <div id="album-tile-container">
        <ui-album-tile-large
          drag-scroll-item
          *ngFor="let item of listData; let i = index"
          [id]="listData[i].id"
          #items
          [clickEnabled]="clickEnabled"
          [mediaTitle]="listData[i].attributes?.name ?? ''"
          [artworkRouterLink]="
            '/media/' + listData[i].relationships?.contents?.data[i]?.type ||
            listData[i].type + '/' + listData[i].id
          "
          [mediaInfo]="{
            name: listData[i].attributes?.name,
            type: listData[i].type,
            id: listData[i].id,
            artists: [listData[i].attributes?.artistName]
          }"
          [artists]="[listData[i].attributes?.artistName] || []"
          [imageSource]="listData[i].attributes?.artwork?.url ?? ''"
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
  @Input() listData!: any[];
  @Input() clickEnabled = true;
  @Output() readonly playEmitter: EventEmitter<{ album: string }> =
    new EventEmitter();
}
