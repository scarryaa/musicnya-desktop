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
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BaseButtonModule,
  DisableChildTabIndexDirective,
  LibraryPlaylist,
} from '@nyan-inc/core';
import { MusicAPIFacade } from '@nyan-inc/shared';
import {
  DrawerModule,
  AlbumTileModule,
  DrawerToggleDirective,
} from '@nyan-inc/ui';
import copy from 'fast-copy';
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
  implements OnChanges, OnDestroy, OnInit
{
  libraryPlaylists$: any;

  constructor(
    private changeReference: ChangeDetectorRef,
    public musicAPIFacade: MusicAPIFacade
  ) {
    super();
  }

  @Input() width?: number;
  @Input() open = false;
  @Output() readonly drawerOpened$: Subject<boolean> = new Subject();

  ngOnInit(): void {
    this.libraryPlaylists$ = this.musicAPIFacade.libraryPlaylists$;
  }

  toggle() {
    this.drawerOpened$.next(this.open);
  }

  getTracks(id: string) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.open = changes['open'].currentValue as boolean;
    this.changeReference.markForCheck();
  }

  ngOnDestroy(): void {}
}
