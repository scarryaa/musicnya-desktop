import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MusicAPIFacade, MusicFacade } from '@nyan-inc/shared';
import { Router } from '@angular/router';
import {
  BannerHeroTileComponent,
  BannerTileComponent,
  HeadingComponent,
  LinkTileSetComponent,
  MediaTileSmallComponent,
  TileSelectorComponent,
  VideoTileComponent,
} from '@nyan-inc/core';
import { MediaTileListComponent } from '@nyan-inc/ui';

@Component({
  selector: 'browse-entry',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    MediaTileListComponent,
    LinkTileSetComponent,
    VideoTileComponent,
    MediaTileSmallComponent,
    HeadingComponent,
    BannerTileComponent,
    BannerHeroTileComponent,
    TileSelectorComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent {
  @Output() needCuratorEmitter = new EventEmitter();

  constructor(
    public vm: MusicAPIFacade,
    private music: MusicFacade,
    private router: Router
  ) {
    this.vm.getBrowseCategories();
  }

  play(type: string, id: string) {
    this.music.setQueueThenPlay(type, id);
  }

  handleCurator(id: string) {
    this.vm.getCurator(id);
  }

  trackBy(index: number, item: any) {
    return item.id;
  }
}
