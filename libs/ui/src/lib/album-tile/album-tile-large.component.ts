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
  JoinPipeModule,
} from '@nyan-inc/core';
import { MediaPlayInfo } from './models';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ui-album-tile-large-presentation',
  template: `
    <core-base-button
      cdkDrag
      [cdkDragStartDelay]="500"
      [tabIndex]="0"
      class="album-tile-large"
      [style.pointerEvents]="clickEnabled ? 'auto' : 'none'"
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
        [style.pointerEvents]="clickEnabled ? 'auto' : 'none'"
        [style.width.rem]="tileSize"
        [style.height.rem]="tileSize"
        alt="{{ mediaInfo.title + ' ' + mediaPlayInfo.type }} art"
        id="artwork"
        [src]="imageSource"
        coreDisableChildTabIndex
        coreDisableChildFocus
      />
      <div
        [ngClass]="{ 'hover-underline': true }"
        id="album-info-large"
        *ngIf="showInfo"
        coreDisableChildTabIndex
      >
        <div>
          <span
            id="title-large"
            (keyUp.Space)="routeEmitter.emit(mediaPlayInfo)"
            (click)="routeEmitter.emit(mediaPlayInfo)"
            [tabIndex]="0"
            >{{ mediaInfo.title }}</span
          >
        </div>
        <div>
          <span
            id="artists"
            (keyUp.Space)="routeEmitter.emit(mediaPlayInfo)"
            (click)="routeEmitter.emit(mediaPlayInfo)"
            [tabIndex]="0"
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

  public mediaPlayInfo: MediaPlayInfo = {
    type: 'url',
    artistIds: [''],
    childIds: [''],
    id: '',
  };

  @Input() mediaInfo!: { type: string; title: string; artists: string[] };
  @Input() playIds!: { mediaId: string; artists: string[] };
  @Input() imageSource: string | undefined;
  @Input() clickEnabled = true;
  @Input() showPlayButton = true;
  @Input() playing = false;
  @Input() tileSize = 8;
  @Input() showInfo = true;

  @Output() readonly playEmitter = new EventEmitter<MediaPlayInfo>();
  @Output() readonly routeEmitter = new EventEmitter<MediaPlayInfo>();

  emitPlay(event: Event) {
    event.stopPropagation();
    this.playEmitter.emit(this.mediaPlayInfo);
  }

  emitRoute(event: Event) {
    event.preventDefault();
    this.routeEmitter.emit(this.mediaPlayInfo);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.mediaPlayInfo = {
        type: 'album',
        id: changes['playIds']?.currentValue.mediaId,
        artistIds: changes['playIds']?.currentValue.artists,
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
  ],
  exports: [AlbumTileLargeComponent],
  declarations: [AlbumTileLargeComponent],
})
export class AlbumTileLargeModule {}
