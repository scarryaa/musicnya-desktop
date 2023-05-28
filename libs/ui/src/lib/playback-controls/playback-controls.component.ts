import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderModule } from '../slider/slider.component';
import {
  BaseButtonComponent,
  BaseButtonModule,
  TooltipComponent,
  TooltipDirectiveModule,
} from '@nyan-inc/core';
import { Observable } from 'rxjs';
import { MusicKit } from 'libs/shared/data-store/src/types';

@Component({
  selector: 'ui-playback-controls',
  template: ` <div id="track-wrapper">
      <ui-slider
        #slider
        [max]="playbackTime?.currentPlaybackDuration || 0"
        [value]="
          (dragging ? slider.value : playbackTime?.currentPlaybackTime) - 10 ||
          0
        "
        (value)="playbackTime.currentPlaybackTime = $event || 0"
        (dragging)="handleDrag($event)"
        (dragStop)="handleDragStop($event)"
      ></ui-slider>
    </div>
    <div id="duration-wrapper">
      <span id="current-time"
        >{{
          dragging
            ? (slider.value * 1000 | date : 'mm:ss')
            : (playbackTime.currentPlaybackTime * 1000 | date : 'mm:ss')
        }}
      </span>
      <span id="duration">{{
        playbackTime?.currentPlaybackDuration * 1000 - 100 || 0 | date : 'mm:ss'
      }}</span>
    </div>
    <div id="controls-wrapper">
      <core-base-button
        #button
        (click)="shuffleEmitter.emit()"
        [tabIndex]="0"
        class="album-tile ui-drawer-item core-base-button-rounded"
        icon="shuffle"
        [ngClass]="{ red: shuffleMode === 1 }"
        id="shuffle-button"
      >
      </core-base-button
      ><core-base-button
        #button
        [tabIndex]="0"
        (click)="previousEmitter.emit()"
        class="album-tile ui-drawer-item core-base-button-rounded"
        icon="skip_previous"
        id="previous-button"
      >
      </core-base-button
      ><core-base-button
        #button
        (click)="playbackState === 2 ? pauseEmitter.emit() : playEmitter.emit()"
        [coreTooltip]="'Play'"
        [tabIndex]="0"
        class="album-tile ui-drawer-item core-base-button-rounded"
        [icon]="playbackState === 2 ? 'pause_circle' : 'play_circle'"
        id="play-button"
      >
      </core-base-button>
      <core-base-button
        #button
        (click)="nextEmitter.emit()"
        [tabIndex]="0"
        class="album-tile ui-drawer-item core-base-button-rounded"
        icon="skip_next"
        id="next-button"
      >
      </core-base-button>
      <core-base-button
        #button
        (click)="repeatEmitter.emit()"
        [tabIndex]="0"
        class="album-tile ui-drawer-item core-base-button-rounded"
        icon="repeat"
        [ngClass]="{ red: repeatMode === 'all', green: repeatMode === 'one' }"
        id="repeat-button"
      >
      </core-base-button>
    </div>`,
  styleUrls: ['./playback-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaybackControlsComponent extends BaseButtonComponent {
  @Output() readonly playEmitter: EventEmitter<void> = new EventEmitter();
  @Output() readonly pauseEmitter: EventEmitter<void> = new EventEmitter();
  @Output() readonly nextEmitter: EventEmitter<void> = new EventEmitter();
  @Output() readonly previousEmitter: EventEmitter<void> = new EventEmitter();
  @Output() readonly shuffleEmitter: EventEmitter<void> = new EventEmitter();
  @Output() readonly repeatEmitter: EventEmitter<void> = new EventEmitter();
  @Output() readonly dragEmitter: EventEmitter<number> = new EventEmitter();
  @Output() readonly dragStopEmitter: EventEmitter<number> = new EventEmitter();

  @Input() playbackState: MusicKit.PlaybackStates =
    MusicKit.PlaybackStates.none;
  @Input() shuffleMode: any;
  @Input() repeatMode: any;
  @Input() dragTime: any;
  @Input() playbackTime: any = {
    currentPlaybackTime: 0,
    currentPlaybackDuration: 0,
  };
  dragging = false;

  handleDrag(event: number): void {
    this.dragging = true;
    this.dragTime = event;
    this.dragEmitter.emit(event);
  }

  handleDragStop(event: number): void {
    this.dragging = false;
    this.dragStopEmitter.emit(event);
  }
}

@Component({
  selector: 'ui-miscellaneous-controls',
  template: `<div id="misc-controls-wrapper">
    <core-base-button
      #button
      [tabIndex]="0"
      class="album-tile ui-drawer-item core-base-button-rounded"
      icon="format_quote"
      id="lyrics-button"
    >
    </core-base-button>
    <core-base-button
      #button
      [tabIndex]="0"
      class="album-tile ui-drawer-item core-base-button-rounded"
      icon="queue_music"
      id="queue-button"
    >
    </core-base-button>
    <core-base-button
      #button
      [coreTooltip]="'Mute'"
      [tabIndex]="0"
      class="album-tile ui-drawer-item core-base-button-rounded"
      icon="volume_down"
      id="volume-button"
    >
    </core-base-button>
    <div id="volume-track-wrapper">
      <ui-slider
        (valueChange)="volumeEmitter.emit($event)"
        [width]="5"
        [max]="20"
      ></ui-slider>
    </div>
  </div>`,
  styleUrls: ['./playback-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiscellaneousControlsComponent extends BaseButtonComponent {
  @Output() readonly volumeEmitter: EventEmitter<number> =
    new EventEmitter<number>();
}

@NgModule({
  imports: [
    CommonModule,
    BaseButtonModule,
    SliderModule,
    TooltipDirectiveModule,
    TooltipComponent,
  ],
  exports: [PlaybackControlsComponent, MiscellaneousControlsComponent],
  declarations: [PlaybackControlsComponent, MiscellaneousControlsComponent],
})
export class PlaybackControlsModule {}
