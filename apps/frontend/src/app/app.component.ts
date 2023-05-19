import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  HostListener,
  ContentChild,
  QueryList,
  ContentChildren,
  AfterContentInit,
  ElementRef,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DrawerComponent } from './drawer/drawer.component';
import { FooterComponent } from './footer/footer.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducers/app.reducer';
import * as AppActions from '../store/actions/app.actions';
import { Observable, Subscription } from 'rxjs';
import * as fromLayout from '../store/reducers/layout.reducer';
import { LayoutState } from '../store/reducers/layout.reducer';
import * as LayoutActions from '../store/actions/layout.actions';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { MusickitFacade } from '@nyan-inc/musickit-typescript';
import {
  DraggableDirective,
  NavigationButtonSmartModule,
} from '@nyan-inc/core';
import { NavigationButtonsComponent } from './navigation-buttons/navigation-buttons.component';

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
export class AppComponent implements OnInit, OnDestroy, AfterContentInit {
  drawerOpen$: Observable<boolean>;
  width!: number;
  subs: Subscription = new Subscription();
  title = 'musicnya';

  @ContentChildren(DraggableDirective, { descendants: true, read: ElementRef })
  draggables!: QueryList<DraggableDirective>;

  constructor(
    private store: Store<AppState & LayoutState>,
    private musickitFacade: MusickitFacade
  ) {
    this.drawerOpen$ = this.store.pipe(select(fromLayout.getDrawerOpen));
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    const elementId = event.target as Element;
    console.log(elementId);
  }

  ngOnInit(): void {
    this.store.dispatch(AppActions.initApp());
    this.musickitFacade.init({
      developerToken: '[redacted]',
      app: {
        name: 'Apple Music',
        build: '1978.4.1',
        version: '1.0',
      },
      sourceType: 24,
      suppressErrorDialog: false,
    });
  }

  ngAfterContentInit(): void {
    console.log(this.draggables);
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
