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
import { Router, RouterModule } from '@angular/router';
import {
  AlbumTileModule,
  BaseButtonModule,
  ChipComponent,
  ChipGroupComponent,
  DisableChildTabIndexDirective,
  FallbackImageDirective,
  JoinPipeModule,
  TooltipDirectiveModule,
  TooltipPosition,
} from '@nyan-inc/core';
import { MusicAPIFacade, SpinnerFacade } from '@nyan-inc/shared';
import { DrawerModule, DrawerToggleDirective } from '@nyan-inc/ui';
import { SpinnerComponent } from '@nyan-inc/core';
import { NgScrollbar, NgScrollbarModule } from 'ngx-scrollbar';
import { Subject, Subscription } from 'rxjs';
import { LetDirective } from '@ngrx/component';
import { LayoutFacade } from '../../store/facades';

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
    SpinnerComponent,
    ChipComponent,
    ChipGroupComponent,
    LetDirective,
    TooltipDirectiveModule,
    JoinPipeModule,
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
  spinnerState$: any;
  TooltipPosition = TooltipPosition;

  constructor(
    private changeReference: ChangeDetectorRef,
    public musicAPIFacade: MusicAPIFacade,
    public spinner: SpinnerFacade,
    public vm: LayoutFacade,
    private router: Router
  ) {
    super();
    this.spinnerState$ = this.spinner.state$;
  }

  @Input() width?: number;
  @Input() open = false;
  @Output() readonly drawerOpened$: Subject<boolean> = new Subject();
  subs = new Subscription();

  @ViewChild('scrollbar') scrollbar!: NgScrollbar;

  handleChipSelect(event: number) {
    switch (event) {
      case 0: {
        this.router.navigateByUrl('/library/songs');
        break;
      }
      case 1: {
        this.router.navigateByUrl('/library/playlists');
        break;
      }
      case 2: {
        this.router.navigateByUrl('/library/albums');
        break;
      }
      case 3: {
        this.router.navigateByUrl('/library/artists');
        break;
      }
      default: {
        break;
      }
    }
  }

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

  //trackBys
  trackByIndex(index: number, item: any): any {
    return index;
  }
}
