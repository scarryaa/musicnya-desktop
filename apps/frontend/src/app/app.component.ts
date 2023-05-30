import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  HostListener,
  QueryList,
  ContentChildren,
  ElementRef,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DrawerComponent } from './drawer/drawer.component';
import { FooterComponent } from './footer/footer.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { select, Store } from '@ngrx/store';
import {
  map,
  Observable,
  Subject,
  Subscription,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { TitleBarComponent } from './title-bar/title-bar.component';
import {
  DraggableDirective,
  HttpService,
  NavigationButtonSmartModule,
} from '@nyan-inc/core';
import { NavigationButtonsComponent } from './navigation-buttons/navigation-buttons.component';
import {
  MusicAPIFacade,
  MusicEventListeners,
  MusicFacade,
  MusicState,
  RouterFacade,
} from '@nyan-inc/shared';
import * as AppActions from '../store/actions/app.actions';
import * as LayoutActions from '../store/actions/layout.actions';
import * as fromLayout from '../store/reducers/layout.reducer';
import * as fromApp from '../store/reducers/app.reducer';
import { AppState } from '../store/reducers/app.reducer';
import { LayoutState } from '../store/reducers/layout.reducer';
import { MusickitBase } from '@nyan-inc/core-services';
import { LetDirective } from '@ngrx/component';
import { AppFacade, LayoutFacade } from '../store/facades';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    DrawerComponent,
    FooterComponent,
    NgScrollbarModule,
    TitleBarComponent,
    NavigationButtonSmartModule,
    NavigationButtonsComponent,
    LetDirective,
  ],
  providers: [MusickitBase, Store<MusicState>],
  selector: 'musicnya-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private _window: any;
  width!: number;
  subs: Subscription = new Subscription();
  title = 'musicnya';
  destroy$ = new Subject<void>();
  drawerOpen$ = this.layout.drawerOpen$;
  state$!: Observable<AppState>;

  @ContentChildren(DraggableDirective, { descendants: true, read: ElementRef })
  draggables!: QueryList<DraggableDirective>;

  constructor(
    private http: HttpService,
    private musicAPIFacade: MusicAPIFacade,
    private app: AppFacade,
    private layout: LayoutFacade
  ) {
    this.state$ = this.app.state$;
  }

  @HostListener('mousedown', ['$event']) onClick(event: MouseEvent) {
    if (event.button === 0 && event.target && event.target) {
      // console.log(event.target as Element);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.http.getConfig();

    this.app.initApp();
    this.app.checkForLogins();
    this.musicAPIFacade.loadAPI();
    this.musicAPIFacade.getLibraryPlaylists();
  }

  handleMenuClick(event: string): void {
    console.log(event);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.destroy$.next();
  }

  toggleDrawer(): void {
    this.drawerOpen$
      .pipe(
        takeUntil(this.destroy$),
        take(1),
        tap((value) =>
          value ? this.layout.closeDrawer() : this.layout.openDrawer()
        )
      )
      .subscribe();
  }
}
