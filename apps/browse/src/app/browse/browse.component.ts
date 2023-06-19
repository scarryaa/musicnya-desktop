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
  RegexSplitPipe,
  RoomType,
  RoomTypePipe,
  TileSelectorComponent,
  VideoTileComponent,
} from '@nyan-inc/core';
import { MediaTileListComponent } from '@nyan-inc/ui';
import { map, skipWhile, takeUntil } from 'rxjs';

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
    RegexSplitPipe,
    RoomTypePipe,
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

  handleRoom(id: string, type: string | undefined, url?: string) {
    if (!id) return;

    switch (type) {
      case 'fcId': {
        this.vm.getRoom(id, 'fcId');
        break;
      }
      case 'pp': {
        this.vm.getRoom(id, 'pp');
        break;
      }
      case 'id': {
        this.vm.getRoom(id, 'id');
        break;
      }
      case 'apple-curators': {
        this.vm.getRoom(id, 'apple-curators');
        break;
      }
      case 'link': {
        window.open(url, '_blank');
        break;
      }
      default: {
        break;
      }
    }
  }

  handleLinkClick(type: string, id: string) {
    switch (type) {
      case 'apple-curators': {
        this.router.navigate(['media/curators/', id]);
        break;
      }
      case 'playlists': {
        this.router.navigate(['media/playlists/', id]);
        break;
      }
      case 'albums': {
        this.router.navigate(['media/albums/', id]);
        break;
      }
      case 'editorial-elements': {
        this.router.navigate(['media/multirooms/', id]);
        break;
      }
      default: {
        break;
      }
    }
  }

  trackBy(index: number, item: any) {
    return item.id;
  }
}
