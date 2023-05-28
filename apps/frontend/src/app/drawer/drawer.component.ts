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
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BaseButtonModule,
  DisableChildTabIndexDirective,
  FallbackImageDirective,
} from '@nyan-inc/core';
import { MusicAPIFacade } from '@nyan-inc/shared';
import {
  DrawerModule,
  AlbumTileModule,
  DrawerToggleDirective,
} from '@nyan-inc/ui';
import { NgScrollbar, NgScrollbarModule } from 'ngx-scrollbar';
import { Subject, Subscription } from 'rxjs';

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
    NgScrollbarModule,
    FallbackImageDirective,
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
  subs = new Subscription();

  @ViewChild('scrollbar') scrollbar!: NgScrollbar;

  ngOnInit(): void {
    this.libraryPlaylists$ = this.musicAPIFacade.libraryPlaylists$;
  }

  toggle() {
    this.drawerOpened$.next(this.open);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.open = changes['open'].currentValue as boolean;
    this.changeReference.markForCheck();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
