import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroTileComponent } from '@nyan-inc/core';
import { MusicAPIFacade } from '@nyan-inc/shared';

@Component({
  selector: 'musicnya-search',
  standalone: true,
  imports: [CommonModule, HeroTileComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  constructor(public vm: MusicAPIFacade) {}

  search(value: string) {
    console.log(value);
  }
}
