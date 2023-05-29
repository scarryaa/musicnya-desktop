import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, Subscription } from 'rxjs';
import { HeadingComponent, MediaTileListComponent } from '@nyan-inc/ui';
import { MusicAPIFacade, MusicFacade, SpinnerFacade } from '@nyan-inc/shared';
import { LetDirective } from '@ngrx/component';
import { SpinnerComponent } from '@nyan-inc/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HeadingComponent,
    MediaTileListComponent,
    LetDirective,
    SpinnerComponent,
  ],
  selector: 'musicnya-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnDestroy, AfterViewInit {
  constructor(
    public musicAPIFacade: MusicAPIFacade,
    public music: MusicFacade
  ) {
    this.state$ = this.musicAPIFacade.state$;
  }

  subs: Subscription = new Subscription();
  _destroy$: Subject<void> = new Subject<void>();
  state$: Observable<any>;

  ngAfterViewInit(): void {
    this.musicAPIFacade.loadAPI();
    this.musicAPIFacade.getRecommendationsAndRecentlyPlayed();
  }

  play(type: string, id: string) {
    console.log('e');
    this.music.setQueueThenPlay(type, id);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  trackBy(index: number, item: any): any {
    return item.id;
  }
}
