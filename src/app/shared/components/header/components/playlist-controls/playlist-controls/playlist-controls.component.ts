import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { distinctUntilChanged, map, Subscription } from 'rxjs';
import { UIState, UIStore } from 'src/app/store/ui-store';

@Component({
  selector: 'app-playlist-controls',
  templateUrl: './playlist-controls.component.html',
  styleUrls: ['./playlist-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistControlsComponent implements OnInit {
  subs: Subscription;
  constructor(public uiStore: UIStore, private ref: ChangeDetectorRef) {
    this.ref.detach();
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.subs.add(this.uiStore.state$.pipe(
      map((state: UIState) => state.headerPageControlsOpacity),
      distinctUntilChanged())
      .subscribe(headerPageControlsOpacity => {
        this.opacity = headerPageControlsOpacity
        this.ref.detectChanges();
      }));
  }

  opacity: number = 0;
  @Input() title: string = '';
}
