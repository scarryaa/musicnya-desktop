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
import { Observable, Subscription } from 'rxjs';
import { TitleBarComponent } from './title-bar/title-bar.component';
import {
  DraggableDirective,
  NavigationButtonSmartModule,
} from '@nyan-inc/core';
import { NavigationButtonsComponent } from './navigation-buttons/navigation-buttons.component';
import { HttpService } from '../../../../libs/core/src/lib/http/http.service';
import {
  MusicAPIFacade,
  MusicEventListeners,
  MusicState,
} from '@nyan-inc/shared';
import * as AppActions from '../store/actions/app.actions';
import * as LayoutActions from '../store/actions/layout.actions';
import * as fromLayout from '../store/reducers/layout.reducer';
import { AppState } from '../store/reducers/app.reducer';
import { LayoutState } from '../store/reducers/layout.reducer';
import { MusickitBase } from '@yan-inc/core-services';

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
  ],
  selector: 'musicnya-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private _window: any;
  drawerOpen$: Observable<boolean>;
  width!: number;
  subs: Subscription = new Subscription();
  title = 'musicnya';

  @ContentChildren(DraggableDirective, { descendants: true, read: ElementRef })
  draggables!: QueryList<DraggableDirective>;

  constructor(
    //TODO convert to facade
    private store: Store<AppState & LayoutState & MusicState>,
    private http: HttpService,
    private musicAPIFacade: MusicAPIFacade,
    private musickit: MusickitBase
  ) {
    this.drawerOpen$ = this.store.pipe(select(fromLayout.getDrawerOpen));
    // TODO fix this
    (window as any).api.cookies((event: any, cookies: any) => {
      console.log((window as any).api.cookies);
      console.log('[appIPC] recv-cookies');
      for (const key of Object.keys(cookies)) {
        console.log(key, cookies[key]);
        localStorage.setItem(key, cookies[key]);
      }
    });
  }

  @HostListener('mousedown', ['$event']) onClick(event: MouseEvent) {
    if (event.button === 0 && event.target && event.target) {
      // console.log(event.target as Element);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.http.getConfig();

    this.store.dispatch(AppActions.initApp());

    const eventListeners = new MusicEventListeners(this.musickit, this.store);
    eventListeners.addEventListeners();
    this.musicAPIFacade.getLibraryPlaylists();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  toggleDrawer(event: boolean): void {
    this.store.dispatch(
      event ? LayoutActions.closeDrawer() : LayoutActions.openDrawer()
    );
  }
}
