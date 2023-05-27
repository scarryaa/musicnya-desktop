import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  NgModule,
  Input,
} from '@angular/core';
import { AlbumTileLargeModule } from './album-tile-large.component';
import { MediaPlayInfo } from './models';
import { Router } from '@angular/router';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ui-album-tile-large',
  template: `
    <ui-album-tile-large-presentation
      [ngClass]="{ zoom: isZoomed }"
      (playEmitter)="play($event)"
      (zoomEmitter)="zoom($event)"
      (routeEmitter)="routeToMediaDetails($event)"
      [showEditOverlay]="showEditOverlay"
      [showZoom]="showZoom"
      [clickEnabled]="clickEnabled"
      [imageSource]="imageSource"
      [showPlayButton]="showPlayButton"
      [tileSize]="tileSize"
      [imageSource]="imageSource"
      [showInfo]="showInfo"
      [mediaInfo]="mediaInfo"
    ></ui-album-tile-large-presentation>
  `,
  styleUrls: ['./album-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumTileLargeSmartComponent {
  constructor(private router: Router) {}
  isZoomed = false;

  @Input() showEditOverlay = false;
  @Input() showZoom = false;
  @Input() clickEnabled = true;
  @Input() imageSource = '';
  @Input() showPlayButton = true;
  @Input() tileSize = 8;
  @Input() mediaTitle = '';
  @Input() showInfo = true;
  @Input() artists: string[] = [];
  @Input() artworkRouterLink = '';
  @Input() id = '';
  @Input() mediaInfo = {
    name: '',
    type: '',
    id: '',
    artists: Array<string>(),
  };

  //TODO move this to a deticated router class in core?
  async routeToMediaDetails(details: MediaPlayInfo) {
    await this.router.navigate(['media/' + details.type + '/' + details.id]);
  }

  zoom(event: Event) {
    this.isZoomed = !this.isZoomed;
  }

  play(details: MediaPlayInfo) {
    // this.musicFacade(queueOptions);
    // this.musicFacade.play();
  }

  async routeToArtist(details: MediaPlayInfo) {
    await this.router.navigate(['artist' + '/' + details.artistIds[0]]);
  }
}
@NgModule({
  imports: [CommonModule, AlbumTileLargeModule, DragDropModule],
  exports: [AlbumTileLargeSmartComponent],
  declarations: [AlbumTileLargeSmartComponent],
})
export class AlbumTileLargeSmartModule {}
