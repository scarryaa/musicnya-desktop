import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { PlaylistDataService } from 'src/app/shared/services/playlist-data/playlist-data.service';
import { Song } from 'src/app/modules/core/models/song';
import { Playlist } from 'src/app/modules/core/models/playlist';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { ColorFadeService } from 'src/app/shared/services/color-fade/color-fade.service';
import { UserPrefsService } from 'src/app/shared/services/user-prefs/user-prefs.service'

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent implements AfterViewInit, OnInit {
  constructor(private playlistDataService: PlaylistDataService, private route: ActivatedRoute, private router: Router,
    private ref: ChangeDetectorRef, private colorFadeService: ColorFadeService, private userPrefsService: UserPrefsService) {}

  rows!: Observable<Array<Song>>;
  playlist$!: Observable<Playlist>;
  imgUrl!: string;
  bgImgColor!: string;
  playlistId!: number;
  playlistTitle!: string;
  drawerCollapsed: boolean = false;
  @ViewChild(CdkScrollable) scrollable!: CdkScrollable;

  async ngOnInit() {
    this.userPrefsService.drawerCollapsed$.subscribe((collapsed) => {
      this.drawerCollapsed = collapsed;
      this.ref.detectChanges();
    });
    
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      this.scrollable.scrollTo({"top": 0});
  });

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
        this.imgUrl = p.artwork ?? '';
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

  ngAfterViewInit() {
    this.scrollable.elementScrolled().pipe().subscribe(() => {
      if (this.scrollable.measureScrollOffset("top") >= 200) {
          this.colorFadeService.changeOpacity(((this.scrollable.measureScrollOffset("top") - 200) / 100), this.bgImgColor);
      } else if (this.scrollable.measureScrollOffset("top") < 200) {
        this.colorFadeService.changeOpacity(0, this.bgImgColor);
      }
      this.ref.detectChanges();
    })
  }

  private handleResults() {
    if (this.playlist$) {
      this.getBackgroundImg();
      this.colorFadeService.setTitle(this.playlistTitle);
    }
  }

  getBackgroundImg(): any {
    this.playlist$.subscribe(
      data => {
        this.imgUrl = data.artwork ?? '';
        this.bgImgColor = data.dominantColor!;
        this.playlistId = data.id;
        this.playlistTitle = data.title;
        this.setColor();
      }
     )
  }

  resetColorAndLeave() {
    this.colorFadeService.changeOpacity(0, this.bgImgColor);
    return true;
  }

  async setColor() {
    document.querySelector('.main-container')!.setAttribute('style', `background: ${this.bgImgColor}`);
  }

  addTrack() {
    console.log(this.playlistId);
    this.playlistDataService.addTrack(this.playlistId);
    this.ref.detectChanges();
  }
}
