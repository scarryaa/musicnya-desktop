import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, ParamMap, Router } from '@angular/router';
import { first, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { PlaylistDataService } from 'src/app/shared/services/playlist-data/playlist-data.service';
import { Song } from 'src/app/modules/core/models/song';
import { Playlist } from 'src/app/modules/core/models/playlist';
import { UIStore } from 'src/app/store/ui-store';
import { ThemeStore } from 'src/app/store/theme-store';
import { darkenColor } from 'src/app/helpers/helpers';
import { UserStore } from 'src/app/store/user-store';
import { MusickitStore } from 'ngx-apple-music';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent implements OnInit {
  constructor(private playlistDataService: PlaylistDataService, private route: ActivatedRoute,
    private ref: ChangeDetectorRef, private themeStore: ThemeStore, private uiStore: UIStore, private musickitStore: MusickitStore,
    private router: Router) {}

  rows!: Observable<Array<MusicKit.Songs>>;
  playlist$!: Observable<MusicKit.Playlists | MusicKit.LibraryPlaylists>;
  imgUrl!: string;
  bgImgColor!: string;
  playlistId!: string;
  playlistTitle!: string;
  playlistDuration!: number;
  loading: boolean = true;
  subs: Subscription = new Subscription();

  async ngOnInit() {
    this.subs.add(this.router.events.subscribe((evt) => {
      if ((evt instanceof NavigationStart)) {
        this.loading = true;
        this.ref.detectChanges();
      }
    }));

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('id'))
      )
    ).subscribe(async (id) => {
      this.playlistId = id!;
      console.log(this.playlistId);
      await this.fetchPlaylistData(this.playlistId).then((p: MusicKit.LibraryPlaylists | MusicKit.Playlists) => {
        this.imgUrl = p.attributes?.artwork?.url.replace('{w}x{h}', '192x192')! ?? p.relationships?.tracks!.data![0].attributes?.artwork.url.replace('{w}x{h}', '192x192');
        this.bgImgColor = p.attributes?.artwork?.bgColor! ?? p.relationships?.tracks!.data![0].attributes?.artwork.bgColor;
        this.playlistId = p.id;
        this.playlistTitle = p.attributes?.name!;
        this.rows = of(p.relationships?.tracks?.data as any);
        this.loading = false;
        this.ref.detectChanges();
      });
    });
  }

  async fetchPlaylistData(id: string): Promise<MusicKit.Playlists | MusicKit.LibraryPlaylists> {
    let res;
    res = JSON.parse(sessionStorage.getItem(`pageData-${id}`)!);
    if (res === null || !Object.keys(res).length || res.id != id) {
      await this.musickitStore.getPlaylistInfo(id).then((data: MusicKit.Playlists | MusicKit.LibraryPlaylists) => {    
        sessionStorage.setItem(`pageData-${id}`, JSON.stringify(data));
        // return this.rows = of((res.relationships?.tracks.data! as unknown) as any);   
        res = data;
      });
    } else console.log('got cached');
    return res;
  }

  totalDuration(): number {
    let duration = 0;
    this.rows.pipe(first()).subscribe(
      (track: MusicKit.Songs[]) => {
      track.forEach(element => {
        duration += element.attributes?.durationInMillis!;
      });
    });

    return duration;
}

  private handleResults() {
    if (this.playlist$) {
      this.getBackgroundImg();
      this.uiStore.setHeaderTitle(this.playlistTitle);
    }
  }

  getBackgroundImg(): any {
    this.playlist$.subscribe(
      p => {
        this.imgUrl = p.attributes?.artwork?.url.replace('{w}x{h}', '600x600')!;
        this.bgImgColor = p.attributes?.artwork?.bgColor!;
        this.playlistId = p.id;
        this.playlistTitle = p.attributes?.name!;
        this.setColor();
        this.themeStore.setHeaderColor(darkenColor(this.bgImgColor));
      }
     )
  }

  playPlaylist() {

  }

  shufflePlayPlaylist() {
    
  }

  resetHeaderOpacity() {
    this.uiStore.resetHeaderPageControlsOpacity();
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
