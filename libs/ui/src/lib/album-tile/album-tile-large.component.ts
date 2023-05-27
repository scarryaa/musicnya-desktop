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
        coreFallbackImage
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
      <div
        [ngClass]="{ 'hover-underline': true }"
        id="album-info-large"
        *ngIf="showInfo"
        coreDisableChildTabIndex
      >
        <div>
          <span
            id="title-large"
            (keyUp.Space)="routeEmitter.emit(mediaInfo)"
            (click)="routeEmitter.emit(mediaInfo)"
            [tabIndex]="0"
            [title]="mediaInfo.name"
            >{{ mediaInfo.name }}</span
          >
        </div>
        <div>
          <span
            id="artists"
            (keyUp.Space)="routeEmitter.emit(mediaInfo)"
            (click)="routeEmitter.emit(mediaInfo)"
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

  emitPlay(event: Event) {
    event.stopPropagation();
    this.playEmitter.emit(this.mediaInfo);
  }

  emitRoute(event: Event) {
    event.preventDefault();
    this.routeEmitter.emit(this.mediaInfo);
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
  ],
  exports: [AlbumTileLargeComponent],
  declarations: [AlbumTileLargeComponent],
})
export class AlbumTileLargeModule {}
