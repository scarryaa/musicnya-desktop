import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  NgModule,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  BaseButtonModule,
  BaseComponent,
  DisableChildFocusDirective,
  DisableChildTabIndexDirective,
  FallbackImageDirective,
  JoinPipeModule,
  PreloadImageDirective,
} from '@nyan-inc/core';
import { MediaPlayInfo } from './models';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ui-album-tile-large-presentation',
  template: `
    <i
      (click)="emitZoom($event)"
      (keyup.Space)="emitZoom($event)"
      id="zoom-icon"
      *ngIf="showZoom"
      class="material-symbols-rounded"
      >zoom_out_map</i
    >
    <div class="edit-overlay" *ngIf="showEditOverlay">
      <button
        class="edit-button"
        (click)="emitEdit($event)"
        (keyup.Space)="emitEdit($event)"
      >
        <i class="material-symbols-rounded">edit</i>
        <span>Edit Playlist Info</span>
      </button>
    </div>
    <core-base-button
      cdkDrag
      [cdkDragStartDelay]="500"
      [tabIndex]="0"
      class="album-tile-large"
      (keyUp.Space)="emitRoute($event)"
      (click)="emitRoute($event)"
      coreDisableChildFocus
    >
      <div
        *ngIf="showPlayButton"
        [style.pointerEvents]="clickEnabled ? 'auto' : 'none'"
        id="play-button-container"
        (click)="emitPlay($event)"
        (keyup.Space)="emitPlay($event)"
      >
        <button id="play-button">
          <i class="material-symbols-rounded">{{
            playing ? 'pause' : 'play_arrow'
          }}</i>
        </button>
      </div>
      <img
        coreFallbackImage
        loading="lazy"
        preloadImage
        [style.pointerEvents]="clickEnabled ? 'auto' : 'none'"
        [style.width.rem]="tileSize"
        [style.height.rem]="tileSize"
        alt="{{ mediaInfo.name + ' ' + mediaInfo.type }} art"
        id="artwork"
        [src]="imageSource"
        coreDisableChildTabIndex
        coreDisableChildFocus
      />
      <div id="album-info-large" *ngIf="showInfo" coreDisableChildTabIndex>
        <div [ngClass]="{ 'hover-underline': true }">
          <span
            id="title-large"
            (keyUp.Space)="routeEmitter.emit(mediaInfo)"
            (click)="routeEmitter.emit(mediaInfo)"
            [tabIndex]="0"
            [title]="mediaInfo.name"
            >{{ mediaInfo.name }}</span
          >
        </div>
        <div [ngClass]="{ 'hover-underline': true }">
          <span
            id="artists"
            (keyUp.Space)="routeEmitter.emit(mediaInfo)"
            (click)="routeEmitter.emit(mediaInfo)"
            [tabIndex]="0"
            [title]="mediaInfo.artists"
            >{{ mediaInfo.artists | join }}</span
          >
        </div>
      </div>
    </core-base-button>
  `,
  styleUrls: ['./album-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BaseComponent, useExisting: AlbumTileLargeComponent }],
})
export class AlbumTileLargeComponent
  extends BaseComponent
  implements OnChanges
{
  @HostBinding('class') class = 'outline-offset';

  @Input() showEditOverlay = false;
  @Input() showZoom = false;
  @Input() imageSource: string = '';
  @Input() clickEnabled = true;
  @Input() showPlayButton = true;
  @Input() playing = false;
  @Input() tileSize = 8;
  @Input() showInfo = true;
  @Input() mediaInfo = {
    name: '',
    type: '',
    id: '',
    artists: Array<string>(),
  };

  @Output() readonly playEmitter = new EventEmitter<any>();
  @Output() readonly routeEmitter = new EventEmitter<any>();
  @Output() readonly editEmitter = new EventEmitter<any>();
  @Output() readonly zoomEmitter = new EventEmitter<any>();

  emitPlay(event: Event) {
    event.stopPropagation();
    this.playEmitter.emit(this.mediaInfo);
  }

  emitEdit(event: Event) {
    event.stopPropagation();
    this.editEmitter.emit();
  }

  emitRoute(event: Event) {
    event.preventDefault();
    this.routeEmitter.emit(this.mediaInfo);
  }

  emitZoom(event: Event) {
    event.preventDefault();
    this.zoomEmitter.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.mediaInfo = {
        name: changes['mediaInfo']?.currentValue?.name,
        type: changes['mediaInfo']?.currentValue?.type,
        id: changes['mediaInfo']?.currentValue?.id,
        artists: changes['mediaInfo']?.currentValue?.artists,
      };
    }
  }
}
@NgModule({
  imports: [
    CommonModule,
    BaseButtonModule,
    JoinPipeModule,
    DisableChildFocusDirective,
    DisableChildTabIndexDirective,
    DragDropModule,
    FallbackImageDirective,
    PreloadImageDirective,
  ],
  exports: [AlbumTileLargeComponent],
  declarations: [AlbumTileLargeComponent],
})
export class AlbumTileLargeModule {}
