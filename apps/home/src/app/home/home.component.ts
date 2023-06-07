import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { HeadingComponent, MediaTileListComponent } from '@nyan-inc/ui';
import { MusicAPIFacade, MusicFacade } from '@nyan-inc/shared';
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
export class HomeComponent implements OnDestroy {
  constructor(public vm: MusicAPIFacade, public music: MusicFacade) {
    this.vm.getRecommendationsAndRecentlyPlayed();
  }

  subs: Subscription = new Subscription();
  _destroy$: Subject<void> = new Subject<void>();

  play(type: string, id: string) {
    this.music.setQueueThenPlay(type, id);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  trackBy(index: number, item: any): any {
    return item.id;
  }
}
