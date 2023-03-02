import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { PlaylistDataService } from 'src/app/shared/services/playlist-data/playlist-data.service';
import { Song } from 'src/app/modules/core/models/song';
import { Playlist } from 'src/app/modules/core/models/playlist';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { UserPrefsService } from 'src/app/shared/services/user-prefs/user-prefs.service'
import { UIService } from 'src/app/shared/services/ui/ui.service';
import { UtilityService } from 'src/app/shared/services/utility/utility.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent implements OnInit {
  constructor(private playlistDataService: PlaylistDataService, private route: ActivatedRoute,
    private ref: ChangeDetectorRef, private themeService: ThemeService, private utilityService: UtilityService,
      private uiService: UIService) {}

  rows!: Observable<Array<Song>>;
  playlist$!: Observable<Playlist>;
  imgUrl!: string;
  bgImgColor!: string;
  playlistId!: number;
  playlistTitle!: string;

  async ngOnInit() {
    this.route.url.subscribe(url =>{
      this.ref.detectChanges();
  });

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('id'))
      )
    ).subscribe((id) => {
      this.playlistId = parseInt(id!);
      this.fetchPlaylistData(this.playlistId);
      this.playlist$.pipe(map((p) => {
        this.imgUrl = p.artwork!;
        this.bgImgColor = p.dominantColor!;
        this.playlistId = p.id;
        this.playlistTitle = p.title;
      }));
      this.handleResults();
    });
  }

  fetchPlaylistData(id: number) {
    this.playlist$ = this.playlistDataService.getPlaylist(id);
    var cachedData = JSON.parse(sessionStorage.getItem('pageData')!);
    if (cachedData == null || !Object.keys(cachedData).length || cachedData['playlistId'] != id) {
      this.playlistDataService.getPlaylistSongs(id).subscribe(res => {    
        sessionStorage.setItem('pageData', JSON.stringify(new Object({playlistId: id, data: res})));
        return this.rows = of(res);   
      });
    } else {
      console.log('got cached');
      this.rows = of(cachedData['data']);
    }
  }

  private handleResults() {
    if (this.playlist$) {
      this.getBackgroundImg();
      this.uiService.setHeaderTitle(this.playlistTitle);
    }
  }

  getBackgroundImg(): any {
    this.playlist$.subscribe(
      data => {
        this.imgUrl = data.artwork!;
        this.bgImgColor = data.dominantColor!;
        this.playlistId = data.id;
        this.playlistTitle = data.title;
        this.setColor();
        this.themeService.headerColor = this.themeService.darkenColor(this.bgImgColor);
      }
     )
  }

  resetColorAndLeave() {
    this.uiService.headerOpacity$.next(0);
    return true;
  }

  async setColor() {
    document.querySelector('.background')!.setAttribute('style', `background: ${this.bgImgColor}`);
  }

  addTrack() {
    console.log(this.playlistId);
    this.playlistDataService.addTrack(this.playlistId);
    this.ref.detectChanges();
  }
}
