import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { PlaylistDataService } from 'src/app/services/playlist-data/playlist-data.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Song } from 'src/app/modules/core/models/song';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FastAverageColorResult } from 'fast-average-color';
import { Playlist } from 'src/app/modules/core/models/playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  constructor(private playlistDataService: PlaylistDataService, private route: ActivatedRoute, private breakpointObserver: BreakpointObserver,
    private ref: ChangeDetectorRef) {

    breakpointObserver
    .observe(["(max-width: 910px)"])
    .subscribe(result => {
      result.matches ? this.displayedColumns = this.displayedColumnsSm : this.displayedColumns = this.displayedColumnsMed;
    });
  }

  async ngOnInit() {
    this.playlist$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.playlistId = parseInt(params.get('id')!);
        return this.playlistDataService.getPlaylist(parseInt(params.get('id')!))
      }
    ));
  
    this.observableDataSource$ = this.playlist$.pipe(map((p) => {
      const dataSource = this.dataSource;
      this.dataSource.data = p.tracks;
      this.bgImgColor = p.dominantColor!;
      this.imgUrl = p.artwork;
      this.playlistId = p.id;
      this.setColor();
      return dataSource;
    }));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.ref.detectChanges();
  }

  getBackgroundImg(): string {
    return `url('${this.imgUrl}')`
  }

  async setColor() {  
    document.querySelector('.background')!.setAttribute('style', `background: ${this.bgImgColor}`);
  }

  selectRow(row: any) {
    this.timer = 0;
    this.preventSimpleClick = false;
    let delay = 250;

    this.timer = setTimeout(() => {
      if(!this.preventSimpleClick){
        console.log('selected');
      }
    }, delay);
  }

  playSong(row: any) {
    this.preventSimpleClick = true;
    clearTimeout(this.timer);

    console.log(row);
  }
  
  timer!: any;
  preventSimpleClick!: boolean;
  playlist$!: Observable<Playlist>;
  observableDataSource$!: Observable<MatTableDataSource<Song>>;
  dataSource = new MatTableDataSource<Song>();
  imgUrl!: string;
  bgImgColor!: string;

  playlistId!: number;
  displayedColumns: string[] = ['id', 'title', 'album', 'dateAdded', 'duration'];
  displayedColumnsMed: string[] = ['id', 'title', 'album', 'dateAdded', 'duration'];
  displayedColumnsSm: string[] = ['id', 'title', 'album', 'duration'];
}
