import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PlaylistDataService } from 'src/app/services/playlist-data/playlist-data.service';
import { Playlist } from '../../models/playlist';

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

export class SideNavComponent implements OnInit {
  constructor(private playlistDataService: PlaylistDataService, private route: ActivatedRoute, private breakpointObserver: BreakpointObserver) { }

  playlists$!: Observable<Playlist[]>;
  to: any;
  scrollbarVisible: boolean = false;
  elementStates: string[] = Array.from(Array(3), (e, i) => 'unselected');

  enter() {
    this.scrollbarVisible = true;
    clearTimeout(this.to);
  }

  leave() {
    this.to = setTimeout(() => {
      this.scrollbarVisible = false
    }, 1000);
  }

  shrinkAnimation() {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
    this.playlists$ = this.playlistDataService.getPlaylists();
  }

  createNewPlaylist() {
    const defaultName = 'playlist ' + (this.playlistDataService.getNumberOfPlaylists() + 1);
    this.playlistDataService.newPlaylist(defaultName);
  }

}
