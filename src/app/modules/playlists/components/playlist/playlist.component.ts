import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { PlaylistDataService } from 'src/app/services/playlist-data/playlist-data.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Song } from 'src/app/modules/core/models/song';
import { Playlist } from 'src/app/modules/core/models/playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable<Song>) songsTable!: MatTable<Song>;
  
  constructor(private playlistDataService: PlaylistDataService, private route: ActivatedRoute,
    private ref: ChangeDetectorRef) {
  }

  rows!: Observable<Array<Song>>;
  urlImg!: string;
  playlist$!: Observable<Playlist>;
  observableDataSource$!: Observable<MatTableDataSource<Song>>;
  dataSourceA = new MatTableDataSource<Song>();
  imgUrl!: string;
  bgImgColor!: string;
  playlistId!: number;

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
        this.imgUrl = p.artwork;
        this.bgImgColor = p.dominantColor!;
        this.playlistId = p.id;
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
  }

  private handleResults() {
    if (this.playlist$) {
      this.getBackgroundImg();
    }
  }

  getBackgroundImg(): any {
    this.playlist$.subscribe(
      data => {
        this.urlImg = `url('${data.artwork}')`;
        this.imgUrl = data.artwork;
        this.bgImgColor = data.dominantColor!;
        this.playlistId = data.id;
        this.setColor();
      }
     )
  }

  async setColor() {
    document.querySelector('.main-container')!.setAttribute('style', `background: ${this.bgImgColor}`);
  }

  addTrack() {
    this.playlistDataService.addTrack();
    this.ref.detectChanges();
  }
}
