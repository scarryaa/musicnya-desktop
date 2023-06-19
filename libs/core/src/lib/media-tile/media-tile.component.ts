import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { OptionsButtonComponent } from '../options-button/options-button.component';
import { FallbackImageDirective } from '../fallback-image.directive';
import { Subject, takeUntil } from 'rxjs';
import { FormatImageURLPipe } from "../formatImageURL/format-image-url.pipe";

@Component({
    selector: 'core-media-tile',
    standalone: true,
    template: `<div class="media-tile-wrapper">
    <div class="media-tile">
      <div class="media-tile__image-wrapper">
        <img
          class="media-tile__image-wrapper__image"
          [src]="(mediaImage || '') | formatImageURL: 400"
          [style.minWidth.rem]="mediaImageSize"
          [style.minHeight.rem]="mediaImageSize"
          [style.aspectRatio]="1"
          coreFallbackImage
        />
        <div
          class="media-tile__image-overlay"
          [routerLink]="titleHover ? mediaLink : undefined"
        >
          <core-play-button
            class="media-tile__image-overlay__play-button"
            (playEmitter)="handlePlayClick()"
          ></core-play-button>
          <core-options-button
            class="media-tile__image-overlay__options-button"
            (optionsEmitter)="handleOptionsClick()"
          ></core-options-button>
        </div>
      </div>
      <div
        class="media-tile__title"
        [routerLink]="titleHover ? mediaLink : undefined"
        [ngClass]="{ hover_underline: titleHover }"
        [title]="mediaTitle"
      >
        {{ mediaTitle }}
      </div>
      <div
        [ngClass]="{ hover_underline: subtitleHover }"
        class="media-tile__subtitle"
        [title]="mediaSubtitle"
        (click)="handleSubtitleClick()"
      >
        {{ mediaSubtitle }}
      </div>
    </div>
  </div>`,
    styleUrls: ['./media-tile.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        PlayButtonComponent,
        OptionsButtonComponent,
        FallbackImageDirective,
        FormatImageURLPipe
    ]
})
export class MediaTileComponent implements OnDestroy {
  @Input() mediaTitle: string | undefined = undefined;
  @Input() mediaSubtitle: string | undefined = undefined;
  @Input() mediaImage: string | undefined = undefined;
  @Input() mediaImageSize: number | undefined = undefined;
  @Input() mediaLink?: string;
  @Input() subtitleLink?: string;
  @Input() id?: string;
  @Input() type?: string;
  @Input() subtitleHover = true;
  @Input() titleHover = true;
  @Input() subtitleEmitter?: EventEmitter<string>;
  @Input() artistID?: string;

  @Output() destroyed$ = new Subject<void>();
  @Output() playEmitter = new EventEmitter<{ type: string; id: string }>();
  @Output() optionsEmitter = new EventEmitter();
  @Output() needCuratorEmitter = new EventEmitter();

  constructor(private router: Router) {}

  handlePlayClick() {
    this.playEmitter.emit({ type: this.type || '', id: this.id || '' });
  }

  handleSubtitleClick() {
    this.artistID
      ? this.router.navigateByUrl('/media/artists/' + this.artistID)
      : this.needCuratorEmitter.emit();
  }

  handleOptionsClick() {
    this.optionsEmitter.emit();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
