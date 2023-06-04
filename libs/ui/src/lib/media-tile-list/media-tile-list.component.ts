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
import { RouterModule } from '@angular/router';
import { AlbumTileLargeSmartModule, MediaTileComponent } from '@nyan-inc/core';

@Component({
  selector: 'ui-media-tile-list',
  standalone: true,
  imports: [CommonModule, HeadingComponent, MediaTileComponent, RouterModule],
  template: `<div
      id="list-wrapper"
      [ngClass]="{ hide: !showMore }"
      [routerLink]="showMore ? '/show-more/' + listId : undefined"
    >
      <ui-heading id="heading" size="medium" [ngClass]="{ hide: !showMore }">{{
        listTitle
      }}</ui-heading>
    </div>
    <div id="album-tile-container">
      <core-media-tile
        class="album-tile"
        *ngFor="let item of listData; let i = index"
        [id]="listData[i].id"
        #items
        [mediaTitle]="listData[i].attributes?.name ?? ''"
        [mediaLink]="'/media/' + listData[i].type + '/' + listData[i].id"
        [mediaSubtitle]="listData[i].attributes?.artistName ?? ''"
        [type]="listData[i].type"
        [mediaImageSize]="10"
        [mediaImage]="listData[i].attributes?.artwork?.url ?? ''"
        (playEmitter)="emit(i)"
        [subtitleLink]="
          '/media/' +
          'artists/' +
          listData[i].attributes?.artistUrl?.split('/').at(-1)
        "
      ></core-media-tile>
    </div>`,
  styleUrls: ['./media-tile-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaTileListComponent {
  @ViewChildren('items', { read: ElementRef })
  mediaItems!: QueryList<ElementRef>;
  @Input() showMore = false;
  @Input() listTitle!: string;
  @Input() listId?: string;
  @Input() listData!: any[];
  @Input() clickEnabled = true;
  @Output() readonly playEmitter: EventEmitter<{ type: string; id: string }> =
    new EventEmitter();

  emit(i: number) {
    this.playEmitter.emit({
      type: this.listData[i].type,
      id: this.listData[i].id,
    });
  }
}
