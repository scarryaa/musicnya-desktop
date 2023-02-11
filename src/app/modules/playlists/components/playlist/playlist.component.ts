import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaylistDataService } from 'src/app/services/playlist-data/playlist-data.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  constructor(private playlistDataService: PlaylistDataService, private route: ActivatedRoute, private router: Router) {}

  playlist$!: Observable<string>;
  playlistId!: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.playlistId = parseInt(paramMap.get('id')!);
    })
  }
}
