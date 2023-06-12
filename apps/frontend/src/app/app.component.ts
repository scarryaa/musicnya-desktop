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
import { Router, RouterModule } from '@angular/router';
import { DrawerComponent } from './drawer/drawer.component';
import { FooterComponent } from './footer/footer.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Observable, Subject, Subscription, take, takeUntil, tap } from 'rxjs';
import { TitleBarComponent } from './title-bar/title-bar.component';
import {
  DraggableDirective,
  NavigationButtonSmartModule,
  SpinnerComponent,
} from '@nyan-inc/core';
import { NavigationButtonsComponent } from './navigation-buttons/navigation-buttons.component';
import {
  MusicAPIFacade,
  MusicEventListeners,
  SpinnerFacade,
} from '@nyan-inc/shared';
import { AppState } from '../store/reducers/app.reducer';
import { LetDirective } from '@ngrx/component';
import { AppFacade, LayoutFacade } from '../store/facades';
import { HttpService } from '@nyan-inc/core-services';

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
    SpinnerComponent,
  ],
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
  spinnerState$: any;

  @ContentChildren(DraggableDirective, { descendants: true, read: ElementRef })
  draggables!: QueryList<DraggableDirective>;

  constructor(
    private http: HttpService,
    private musicAPIFacade: MusicAPIFacade,
    private app: AppFacade,
    private layout: LayoutFacade,
    private eventListeners: MusicEventListeners,
    public spinner: SpinnerFacade,
    private router: Router
  ) {
    this.state$ = this.app.state$;
    this.spinnerState$ = this.spinner.state$;
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
    this.eventListeners.addEventListeners();
  }

  handleMenuClick(event: string): void {
    switch (event) {
      case 'settings': {
        console.log('hello');
        this.router.navigateByUrl('/settings');
        break;
      }
      case 'loginAppleMusic': {
        this.app.loginAppleMusic();
        break;
      }
      case 'loginSpotify': {
        this.app.loginSpotify();
        break;
      }
    }
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
