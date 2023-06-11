import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroTileComponent, SearchbarComponent } from '@nyan-inc/core';
import { MusicAPIFacade, MusicFacade } from '@nyan-inc/shared';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'musicnya-search',
  standalone: true,
  imports: [CommonModule, HeroTileComponent, RouterModule, SearchbarComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  constructor(public vm: MusicAPIFacade, public music: MusicFacade) {}

  search(value: string) {
    this.vm.search(value);
  }
}
