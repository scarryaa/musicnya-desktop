import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { PlaylistDataService } from 'src/app/shared/services/playlist-data/playlist-data.service';
import { Playlist } from 'src/app/modules/core/models/playlist';
import { UserPrefsService } from '../../services/user-prefs/user-prefs.service';
import { environment } from 'src/environments/environment';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NavigationEnd, Router } from '@angular/router';
import { ColorFadeService } from '../../services/color-fade/color-fade.service';

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
    private colorFadeService: ColorFadeService) { }

  drawerCollapsed: boolean = false;
  drawerCollapsed$!: Subscription;
  playlists$!: Observable<Playlist[]>;
  to: any;
  scrollbarVisible: boolean = false;
  elementStates: string[] = Array.from(Array(4), (e, i) => 'unselected');
  enableWindowControls: boolean = true;
  @ViewChild(CdkScrollable) scrollable!: CdkScrollable;
  platformIsWindows: boolean = true;

  ngOnInit() {
    this.platformIsWindows = !this.userPrefsService.isWindows();
    this.router.events.subscribe((evt) => {
      if (!this.router.url.includes('playlist')) this.colorFadeService.setColor('170, 168, 218');
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.scrollable.scrollTo({ "top": 0 });
    });

    this.enableWindowControls = environment.enableWindowControls;
    this.playlists$ = this.playlistDataService.getPlaylists();
    this.drawerCollapsed$ = this.userPrefsService.drawerCollapsed$.subscribe((value: boolean) => this.drawerCollapsed = value);
  }

  ngAfterViewInit() {
    this.scrollable.elementScrolled().pipe().subscribe(() => {
      if (this.scrollable.measureScrollOffset("top") >= 0) {
          this.colorFadeService.changeOpacity(((this.scrollable.measureScrollOffset("top") - 0) / 100), '0, 0, 0');
      } else if (this.scrollable.measureScrollOffset("top") < 200) {
        this.colorFadeService.changeOpacity(0, '000000');
      }
    })
  }

  ngOnDestroy(): void {
    this.drawerCollapsed$.unsubscribe();
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
