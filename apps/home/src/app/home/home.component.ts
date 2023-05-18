import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingComponent, MediaTileListComponent } from '@nyan-inc/ui';
import { DragScrollModule } from 'ngx-drag-scroll';
import { Subject, Subscription } from 'rxjs';
import { MusickitFacade } from '@nyan-inc/musickit-typescript';

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
  subs: Subscription = new Subscription();
  _destroy$: Subject<void> = new Subject<void>();

  play(object: { album: string }) {
    this.musickitFacade.setQueue(object);
    this.musickitFacade.play();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
