import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { PlaylistDataService } from 'src/app/shared/services/playlist-data/playlist-data.service';
import { Playlist } from 'src/app/modules/core/models/playlist';
import { UserPrefsService } from '../../services/user-prefs/user-prefs.service';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NavigationEnd, Router } from '@angular/router';
import { ThemeService } from '../../services/theme/theme.service';
import { UIService } from '../../services/ui/ui.service';
import { CurrentPlatform } from '../../services/ui/current-platform';

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

export class SideNavComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private playlistDataService: PlaylistDataService, private userPrefsService: UserPrefsService, private router: Router,
    private themeService: ThemeService, public uiService: UIService) { }

  playlists$!: Observable<Playlist[]>;
  to: any;
  scrollbarVisible: boolean = false;
  elementStates: string[] = Array.from(Array(4), (e, i) => 'unselected');
  currentPlatform: CurrentPlatform = this.userPrefsService.getCurrentPlatform();
  @ViewChild(CdkScrollable) scrollable!: CdkScrollable;
  drawerCollapsed!: boolean;

  ngOnInit() {
    this.currentPlatform = this.userPrefsService.getCurrentPlatform();
    this.router.events.subscribe((evt) => {
      if (!this.router.url.includes('playlist')) this.themeService.resetColorHeader();
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.scrollable.scrollTo({ "top": 0 });
    });
    this.uiService.drawerCollapsed$.subscribe((res) => this.drawerCollapsed = res);
    this.playlists$ = this.playlistDataService.getPlaylists();
  }

  ngAfterViewInit() {
    this.scrollable.elementScrolled().pipe().subscribe(() => {
      this.uiService.getScrollPosition(this.scrollable.measureScrollOffset("top"));
    })
  }

  ngOnDestroy(): void {
    this.uiService.drawerCollapsed$.unsubscribe();
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
