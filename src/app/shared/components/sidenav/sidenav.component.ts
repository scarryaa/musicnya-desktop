import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { distinctUntilChanged, map, Observable, Subscription } from 'rxjs';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { PlaylistDataService } from 'src/app/shared/services/playlist-data/playlist-data.service';
import { Playlist } from 'src/app/modules/core/models/playlist';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MatMenu } from '@angular/material/menu';
import { UIState, UIStore } from 'src/app/store/ui-store';
import { environment } from 'src/environments/environment';
import { UserState, UserStore } from 'src/app/store/user-store';
import { MusickitStore } from 'ngx-apple-music';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('elementState', [
      state('selected',
        style({
          transform: 'scale(0.995, 0.995)',
        })
      ),
      state('unselected',
        style({
          transform: 'scale(1, 1)',
        })
      ),
      transition('selected <=> *', [
        animate('1ms ease')
      ])
    ])
  ]
})

export class SideNavComponent implements OnInit, AfterViewInit, OnDestroy {
  useElectron: boolean;
  scrollbarVisible: boolean;
  playlists$!: Observable<Playlist[]>;
  to: any;
  elementStates: string[];
  @ViewChild(CdkScrollable) scrollable!: CdkScrollable;
  drawerCollapsed!: boolean;
  headerHeight!: number;
  @Input() matMenu!: MatMenu;
  subs: Subscription;
  playlists: any;

  constructor(public playlistDataService: PlaylistDataService, private router: Router, public uiStore: UIStore, public userStore: UserStore, public musickitStore: MusickitStore) {
    this.useElectron = environment.useElectron;
    this.scrollbarVisible = false;
    this.elementStates = Array.from(Array(4), (e, i) => 'unselected');
    this.subs = new Subscription();
  }

  ngOnInit() {
    this.subs.add(this.uiStore.state$.pipe(
      map((state: UIState) => state.drawerCollapsed),
      distinctUntilChanged())
      .subscribe(drawerCollapsed => this.drawerCollapsed = drawerCollapsed));

    // there is probably a better way to do this
    this.subs.add(this.uiStore.state$.pipe(
      map((state: UIState) => state.headerHeight),
      distinctUntilChanged())
      .subscribe(headerHeight => this.headerHeight = headerHeight));

    this.subs.add(this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.scrollable.scrollTo({ "top": 0 });
      this.scrollable.getElementRef().nativeElement.style.display = 'block';
    }));

    this.subs.add(this.userStore.state$.subscribe((state: UserState) => {
      this.playlists = state.playlists;
    }));
  }

  ngAfterViewInit() {
    // not sure if we can refactor this out to the ui service
    this.subs.add(this.scrollable.elementScrolled().pipe().subscribe(() => {
      let position = this.scrollable.measureScrollOffset("top");
        if (position >= 0) this.uiStore.setHeaderPageControlsOpacity(position / 100);
        else if (position < 200) this.uiStore.resetHeaderPageControlsOpacity();
      }));
      // this.uiStore.setScrollPosition(this.scrollable.measureScrollOffset("top"));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  handleDrawerMouseOver() {
    this.uiStore?.setDrawerScrollbarVisible();
    clearTimeout(this.to);
  }

  handleDrawerMouseLeave() {
    this.to = setTimeout(() => {
      this.uiStore?.resetDrawerScrollbarVisible();
    }, 1000);
  }

  enter() {
    this.scrollbarVisible = true;
    clearTimeout(this.to);
  }

  leave() {
    this.to = setTimeout(() => {
      this.scrollbarVisible = false
    }, 1000);
  }

  createNewPlaylist() {
    const defaultName = 'playlist ' + (this.playlistDataService.getNumberOfPlaylists() + 1);
    this.playlistDataService.newPlaylist(defaultName);
  }
}
