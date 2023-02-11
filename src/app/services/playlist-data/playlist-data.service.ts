import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistDataService {
  constructor() {}

  playlists: any[] = [{name: "playlist 3", id: 2}, {name: "playlist 2", id: 1}, {name: "playlist 1", id: 0}];
  playlists$: Observable<any[]> = of(this.playlists);

  getPlaylists(): Observable<any[]> {
    return this.playlists$;
  }

  getPlaylist(id: number): Observable<string> {
    return of(this.playlists[id]);
  } 

  newPlaylist(name: string) {
    this.playlists.unshift({name: name, id: this.playlists.length});
  }

  getNumberOfPlaylists(): number {
    return this.playlists.length;
  }

}
