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
import { MediaUtilities } from './media-type-converters';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ui-album-tile-large',
  template: `
    <ui-album-tile-large-presentation
      (playEmitter)="play($event)"
      (routeEmitter)="routeToMediaDetails($event)"
      [clickEnabled]="clickEnabled"
      [playIds]="{ mediaId: '601140186', artists: ['0'] }"
      [imageSource]="imageSource"
      [showPlayButton]="showPlayButton"
      [tileSize]="tileSize"
      [imageSource]="imageSource"
      [showInfo]="showInfo"
      [mediaInfo]="{
        type: '',
        title: 'The New Abnormal',
        artists: ['The Strokes']
      }"
    ></ui-album-tile-large-presentation>
  `,
  styleUrls: ['./album-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumTileLargeSmartComponent {
  constructor(private router: Router) {}

  @Input() clickEnabled = true;
  @Input() imageSource = '';
  @Input() showPlayButton = true;
  @Input() tileSize = 8;
  @Input() showInfo = true;

  //TODO move this to a deticated router class in core?
  async routeToMediaDetails(details: MediaPlayInfo) {
    await this.router.navigate(['media/' + details.type + '/' + details.id]);
  }

  play(details: MediaPlayInfo) {
    const queueOptions = MediaUtilities.convertToQueueItem(details);
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
