import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChildren,
  ElementRef,
  QueryList,
  HostBinding,
  ChangeDetectorRef,
  NgModule,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  BaseButtonModule,
  BaseComponent,
  DisableChildTabIndexDirective,
  FallbackImageDirective,
  JoinPipeModule,
} from '@nyan-inc/core';

@Component({
  selector: 'ui-album-tile',
  template: `
    <core-base-button #button class="album-tile ui-drawer-item">
      <img
        loading="lazy"
        defaultImage="/assets/images/music-note.webp"
        *ngIf="showArt"
        id="artwork"
        alt="{{ type }} art"
        [style.max-width.rem]="tileSize"
        [style.max-height.rem]="tileSize"
        [src]="source"
        [ngClass]="{ 'hover-underline': hoverUnderline }"
        [routerLink]="artworkRouterLink"
        [tabIndex]="-1"
      />
      <div
        id="album-info"
        #span
        *ngIf="mediaTitle || showArtists"
        [style.display]="showArtists ? 'flex' : 'block'"
      >
        <ng-container *ngIf="mediaTitle">
          <span
            [ngClass]="{
              'hover-underline':
                titleRouterLink !== undefined ? hoverUnderline : false
            }"
            #span
            id="title"
            [title]="mediaTitle"
            [routerLink]="titleRouterLink"
            [tabIndex]="-1"
            >{{ mediaTitle }}</span
          ></ng-container
        >
        <ng-container *ngIf="showArtists">
          <span
            [ngClass]="{ 'hover-underline': hoverUnderline }"
            #span
            id="artists"
            [title]="artists"
            [routerLink]="artistsRouterLink"
            [tabIndex]="-1"
            >{{ artists }}</span
          >
        </ng-container>
      </div>
    </core-base-button>
  `,
  styleUrls: ['./album-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BaseComponent, useExisting: AlbumTileComponent }],
})
export class AlbumTileComponent extends BaseComponent {
  @Input() type!: string;
  @Input() source!: string;
  @Input() mediaTitle!: string;
  @Input() artists!: string[];
  @Input() tileSize = 2;
  @Input() showArtists = this.artists ? true : false;
  @Input() hoverUnderline = false;
  @Input() showArt = true;
  @ViewChildren('span', { read: ElementRef })
  spanElements!: QueryList<ElementRef>;
  @Input() titleRouterLink: string | undefined;
  @Input() artistsRouterLink = '';
  @Input() artworkRouterLink!: string;

  @ViewChildren('button', { read: ElementRef })
  buttonElements!: QueryList<ElementRef>;

  constructor(
    protected changeDetector: ChangeDetectorRef,
    elementReference: ElementRef,
    router: Router
  ) {
    super(changeDetector, elementReference, router);
  }

  override toggleButtonWidth(): void {
    console.log(this.buttonElements);
    for (const item of this.buttonElements) {
      if ((item.nativeElement as HTMLElement).style.width === '') {
        (item.nativeElement as HTMLElement).style.width = 'auto';
      }
      (item.nativeElement as HTMLElement).style.width =
        (item.nativeElement as HTMLElement).style.width == 'auto'
          ? '90%'
          : 'auto';
    }
  }
}

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    JoinPipeModule,
    BaseButtonModule,
    DisableChildTabIndexDirective,
    FallbackImageDirective,
  ],
  exports: [AlbumTileComponent],
  declarations: [AlbumTileComponent],
})
export class AlbumTileModule {}
