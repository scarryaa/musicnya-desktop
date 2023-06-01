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
import { AlbumTileLargeSmartModule } from '@nyan-inc/core';

@Component({
  selector: 'ui-media-tile-list',
  standalone: true,
  imports: [
    CommonModule,
    HeadingComponent,
    AlbumTileLargeSmartModule,
    RouterModule,
  ],
  template: `<div
      id="list-wrapper"
      [ngClass]="{ hide: !showMore }"
      [routerLink]="showMore ? '/show-more/' + listTitle : undefined"
    >
      <ui-heading id="heading" size="medium">{{ listTitle }}</ui-heading>
    </div>
    <div id="album-tile-container">
      <ui-album-tile-large
        *ngFor="let item of listData; let i = index"
        [id]="listData[i].id"
        #items
        [clickEnabled]="clickEnabled"
        [mediaTitle]="listData[i].attributes?.name ?? ''"
        [artworkRouterLink]="
          '/media/' + listData[i].type + '/' + listData[i].id
        "
        [mediaInfo]="{
          name: listData[i].attributes.name,
          type: listData[i].type,
          id: listData[i].id,
          artists: [listData[i].attributes.artistName]
        }"
        [artists]="[listData[i].attributes?.artistName]"
        [imageSource]="listData[i].attributes?.artwork?.url ?? ''"
        (playEmitter)="emit(i)"
      ></ui-album-tile-large>
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
