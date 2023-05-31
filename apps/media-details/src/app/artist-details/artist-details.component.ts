import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseButtonModule } from '@nyan-inc/core';
import { MusicFacade, MusicAPIFacade } from '@nyan-inc/shared';
import { Observable } from 'rxjs';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'musicnya-artist-details',
  standalone: true,
  imports: [CommonModule, BaseButtonModule, LetDirective],
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDetailsComponent {
  state$: Observable<any>;
  musicState$: MusicFacade;

  constructor(
    private changeReference: ChangeDetectorRef,
    private musicAPIFacade: MusicAPIFacade,
    private musicFacade: MusicFacade
  ) {
    this.state$ = this.musicAPIFacade.state$;
    this.musicState$ = this.musicFacade;
  }
}
