import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragScrollModule } from 'ngx-drag-scroll';
import { Subject, Subscription } from 'rxjs';
import {
  MusickitAPIService,
  MusickitFacade,
} from '@nyan-inc/musickit-typescript';
import { HeadingComponent, MediaTileListComponent } from '@nyan-inc/ui';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HeadingComponent,
    MediaTileListComponent,
    DragScrollModule,
  ],
  selector: 'musicnya-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnDestroy {
  musickitFacade = inject(MusickitFacade);
  musickit = inject(MusickitAPIService);
  subs: Subscription = new Subscription();
  _destroy$: Subject<void> = new Subject<void>();

  play(object: { album: string }) {
    this.musickitFacade.setQueue({ ...object, startPlaying: true });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
