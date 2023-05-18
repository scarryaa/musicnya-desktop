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
  JoinPipeModule,
} from '@nyan-inc/core';

@Component({
  selector: 'ui-album-tile-large',
  template: `
    <core-base-button
      #button
      [tabIndex]="0"
      class="album-tile-large"
      [style.pointerEvents]="clickEnabled ? 'auto' : 'none'"
      (keyUp.Space)="routeToMedia()"
      (keyUp.Enter)="routeToMedia()"
    >
      <div
        *ngIf="showPlayButton"
        id="play-button-container"
        (click)="playEmitter.emit({ album: '601140186' })"
        [style.pointerEvents]="clickEnabled ? 'auto' : 'none'"
      >
        <button id="play-button">
          <i class="material-symbols-rounded">play_arrow</i>
        </button>
      </div>
      <img
        id="artwork"
        alt="{{ type }} art"
        [style.width.rem]="tileSize"
        [style.height.rem]="tileSize"
        [src]="source"
        routerLinkActive="active"
        [ngClass]="{ 'hover-pointer': hoverUnderline }"
        [routerLink]="clickEnabled ? artworkRouterLink : null"
        coreDisableChildTabIndex
        [style.pointerEvents]="clickEnabled ? 'auto' : 'none'"
      />
      <div
        id="album-info-large"
        #span
        coreDisableChildTabIndex
        *ngIf="mediaTitle || showArtists"
        [style.display]="showArtists ? 'flex' : 'block'"
        [ngClass]="{ 'hover-underline': hoverUnderline }"
      >
        <ng-container *ngIf="mediaTitle">
          <span
            #span
            id="title-large"
            (keyUp.Space)="routeToMedia()"
            (keyUp.Enter)="routeToMedia()"
            [routerLink]="titleRouterLink"
            [tabIndex]="0"
            >{{ mediaTitle }}</span
          ></ng-container
        >
        <ng-container *ngIf="showArtists">
          <span
            #span
            id="artists"
            (keyUp.Space)="routeToMedia()"
            (keyUp.Enter)="routeToArtist()"
            [routerLink]="artistsRouterLink"
            [tabIndex]="0"
            >{{ artists | join }}</span
          >
        </ng-container>
      </div>
    </core-base-button>
  `,
  styleUrls: ['./album-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BaseComponent, useExisting: AlbumTileLargeComponent }],
})
export class AlbumTileLargeComponent extends BaseComponent {
  @Input() type!: string;
  @Input() source!: string;
  @Input() mediaTitle!: string;
  @Input() artists!: string[];
  @Input() tileSize = 2;
  @Input() showArtists = this.artists ? true : false;
  @Input() hoverUnderline = false;
  @ViewChildren('span', { read: ElementRef })
  spanElements!: QueryList<ElementRef>;
  @HostBinding('class') class = 'outline-offset';
  @Input() titleRouterLink!: string;
  @Input() artistsRouterLink!: string;
  @Input() artworkRouterLink!: string;
  @Input() clickEnabled = true;
  @Input() showPlayButton = true;
  @Output() readonly playEmitter: EventEmitter<{ album: string }> =
    new EventEmitter();

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

  //TODO move this to a deticated router class in core?
  async routeToMedia() {
    if (this.titleRouterLink) {
      await this.router.navigate([this.titleRouterLink]);
    }
  }

  async routeToArtist() {
    if (this.artistsRouterLink) {
      await this.router.navigate([this.artistsRouterLink]);
    }
  }
}

@Component({
  selector: 'ui-album-tile',
  template: `
    <core-base-button
      #button
      [tabIndex]="0"
      class="album-tile ui-drawer-item"
      [ngClass]=""
    >
      <img
        id="artwork"
        alt="{{ type }} art"
        [style.max-width.rem]="tileSize"
        [style.max-height.rem]="tileSize"
        [src]="source"
        [ngClass]="{ 'hover-underline': hoverUnderline }"
        [routerLink]="artworkRouterLink"
      />
      <div
        id="album-info"
        #span
        *ngIf="mediaTitle || showArtists"
        [style.display]="showArtists ? 'flex' : 'block'"
        [ngClass]="{ 'hover-underline': hoverUnderline }"
      >
        <ng-container *ngIf="mediaTitle">
          <span #span id="title" [routerLink]="titleRouterLink">{{
            mediaTitle
          }}</span></ng-container
        >
        <ng-container *ngIf="showArtists">
          <span #span id="artists" [routerLink]="artistsRouterLink">{{
            artists | join
          }}</span>
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
  @ViewChildren('span', { read: ElementRef })
  spanElements!: QueryList<ElementRef>;
  @Input() titleRouterLink = '';
  @Input() artistsRouterLink = '';
  @Input() artworkRouterLink = '';

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
  ],
  exports: [AlbumTileComponent, AlbumTileLargeComponent],
  declarations: [AlbumTileComponent, AlbumTileLargeComponent],
})
export class AlbumTileModule {}
