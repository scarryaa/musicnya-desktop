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
import { MediaTileComponent } from '@nyan-inc/core';
import { MusicKit } from '@nyan-inc/shared-types';

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
        *ngFor="let item of listData; let i = index; trackBy: trackByIndex"
        [id]="listData[i].id"
        #items
        [mediaTitle]="listData[i].attributes?.['name'] ?? ''"
        [mediaLink]="'/media/' + listData[i].type + '/' + listData[i].id"
        [mediaSubtitle]="listData[i].attributes?.['artistName'] ?? ''"
        [type]="listData[i].type"
        [mediaImageSize]="10"
        [mediaImage]="listData[i].attributes?.['artwork']?.url ?? ''"
        (playEmitter)="emit(i)"
        [subtitleHover]="listData[i].type !== 'stations'"
        [titleHover]="listData[i].type !== 'stations'"
        [subtitleLink]="
          '/media/' +
          'artists/' +
          listData[i].attributes?.['artistUrl']?.split('/').at(-1)
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
  @Input() listData!: MusicKit.Resource[];
  @Input() clickEnabled = true;
  @Output() readonly playEmitter: EventEmitter<{ type: string; id: string }> =
    new EventEmitter();

  emit(i: number) {
    this.playEmitter.emit({
      type: this.listData[i].type,
      id: this.listData[i].id,
    });
  }

  trackByIndex(index: number, item: any): any {
    return index;
  }
}
