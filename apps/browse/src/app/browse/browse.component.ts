import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MediaTileListComponent } from '@nyan-inc/ui';
import { MusicAPIFacade, MusicFacade } from '@nyan-inc/shared';
import { MusickitAPI } from '@nyan-inc/core-services';
import { Router } from '@angular/router';

@Component({
  selector: 'browse-entry',
  standalone: true,
  imports: [CommonModule, LetDirective, MediaTileListComponent],
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
    this.vm.selectEditorialElementsData$.subscribe((data) => {
      console.log(data);
    });
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
