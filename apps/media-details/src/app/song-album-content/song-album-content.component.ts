import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MediaDetailsDropdownModule,
  VirtualTableModule,
  VirtualTableSmartModule,
} from '@nyan-inc/ui';
import { Observable, Subject } from 'rxjs';
import { MusicFacade, MusicAPIFacade } from '@nyan-inc/shared';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'musicnya-song-album-content',
  standalone: true,
  imports: [
    CommonModule,
    VirtualTableSmartModule,
    VirtualTableModule,
    LetDirective,
    MediaDetailsDropdownModule,
  ],
  templateUrl: './song-album-content.component.html',
  styleUrls: ['./song-album-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongAlbumContentComponent {
  musicState$: MusicFacade;
  state$: Observable<any>;
  readonly routeChangeEmitter = new Subject<void>();
  showAdditionalInfo = false;

  constructor(
    private changeReference: ChangeDetectorRef,
    public musicAPIFacade: MusicAPIFacade,
    private musicFacade: MusicFacade
  ) {
    this.state$ = this.musicAPIFacade.state$;
    this.musicState$ = this.musicFacade;
    this.musicAPIFacade.getRatings$.subscribe((data) => {
      console.log(data);
    });
    this.state$.subscribe((data) => {
      console.log(data);
    });
  }

  toggleShowContent() {
    this.showAdditionalInfo = !this.showAdditionalInfo;
    this.changeReference.detectChanges();
  }
}
