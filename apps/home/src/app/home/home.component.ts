import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, Subscription } from 'rxjs';
import { HeadingComponent, MediaTileListComponent } from '@nyan-inc/ui';
import { MusicAPIFacade } from '@nyan-inc/shared';
import { LetDirective } from '@ngrx/component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HeadingComponent,
    MediaTileListComponent,
    LetDirective,
  ],
  selector: 'musicnya-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnDestroy, OnInit {
  constructor(public musicAPIFacade: MusicAPIFacade) {
    this.state$ = this.musicAPIFacade.state$;
  }

  subs: Subscription = new Subscription();
  _destroy$: Subject<void> = new Subject<void>();
  state$: Observable<any>;

  ngOnInit(): void {
    this.musicAPIFacade.getRecommendationsAndRecentlyPlayed();
  }

  play(object: { album: string }) {
    // this.musickitFacade.setQueue({ ...object, startPlaying: true });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  trackBy(index: number, item: any): any {
    return item.id;
  }
}
