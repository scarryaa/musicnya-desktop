import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  OnChanges,
  ChangeDetectorRef,
  Input,
  Output,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BaseButtonModule,
  DisableChildTabIndexDirective,
} from '@nyan-inc/core';
import {
  DrawerModule,
  AlbumTileModule,
  DrawerToggleDirective,
} from '@nyan-inc/ui';
import { Observable, Subject, Subscription, map, of, tap } from 'rxjs';

@Component({
  selector: 'musicnya-drawer',
  standalone: true,
  imports: [
    CommonModule,
    DrawerModule,
    AlbumTileModule,
    BaseButtonModule,
    RouterModule,
    DrawerToggleDirective,
    DisableChildTabIndexDirective,
    DragDropModule,
  ],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent
  extends EventTarget
  implements OnChanges, OnDestroy
{
  // userPlaylists: Observable<any[] | undefined>;

  constructor(
    private changeReference: ChangeDetectorRef,
  ) {
    super();

    // this.userPlaylists = this.musicAPIFacade.libraryPlaylists$;
  }

  @Input() width?: number;
  @Input() open = false;
  @Output() readonly drawerOpened$: Subject<boolean> = new Subject();

  toggle() {
    this.drawerOpened$.next(this.open);
  }

  getTracks(id: number) {
    // this.musicAPIFacade.getLibraryPlaylistSongs(id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.open = changes['open'].currentValue as boolean;
    this.changeReference.markForCheck();
  }

  ngOnDestroy(): void {}
}
