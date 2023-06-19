import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicAPIFacade, MusicFacade } from '@nyan-inc/shared';
import {
  BannerHeroTileComponent,
  BannerTileComponent,
  FormatImageURLPipe,
  HeadingComponent,
  LinkTileSetComponent,
  RegexSplitPipe,
  RoomType,
  RoomTypePipe,
  TileSelectorComponent,
} from '@nyan-inc/core';
import { LetDirective } from '@ngrx/component';
import { Router } from '@angular/router';

@Component({
  selector: 'rooms-main',
  standalone: true,
  imports: [
    CommonModule,
    TileSelectorComponent,
    BannerTileComponent,
    LinkTileSetComponent,
    BannerHeroTileComponent,
    HeadingComponent,
    LetDirective,
    FormatImageURLPipe,
    RoomTypePipe,
    RegexSplitPipe,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  constructor(
    public vm: MusicAPIFacade,
    private music: MusicFacade,
    private router: Router
  ) {}

  play(type: string, id: string) {
    this.music.setQueueThenPlay(type, id);
  }

  handleCurator(id: string) {
    this.vm.getCurator(id);
  }

  handleRoom(id: string, type: string | undefined) {
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
        this.router.navigate(['media/curators/', id]);
        break;
      }
      default: {
        this.vm.getRoom(id, 'curator');
        break;
      }
    }
  }

  trackBy(index: number, item: any) {
    return item.id;
  }
}
