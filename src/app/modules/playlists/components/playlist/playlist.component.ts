import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Playlist } from 'src/app/modules/core/models/playlist';
import { PlaylistDataService } from 'src/app/services/playlist-data/playlist-data.service';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Song } from 'src/app/modules/core/models/song';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {
  constructor(private playlistDataService: PlaylistDataService, private route: ActivatedRoute, private router: Router) {}
  @ViewChild(MatSort) sort!: MatSort;

  playlist$ = this.route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      this.playlistDataService.getPlaylist(parseInt(params.get('id')!)))
  );

  observableDataSource$ = this.playlist$.pipe(map((p) => {
    const dataSource = this.dataSource;
    this.dataSource.data = p.tracks;
    this.dataSource.sort = this.sort;
    this.imgUrl = p.artwork;
    return dataSource;
  }));

  getBackgroundImg(): string {
    return `url('${this.imgUrl}')`
  }

  dataSource = new MatTableDataSource<Song>();
  imgUrl!: string;

  playlistId!: number;
  displayedColumns: string[] = ['id', 'title', 'album', 'length'];
}
