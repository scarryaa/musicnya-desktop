import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Playlist } from 'src/app/modules/core/models/playlist';
import { Song } from 'src/app/modules/core/models/song';

@Injectable({
  providedIn: 'root'
})
export class PlaylistDataService {
  samplePlaylist = new Playlist(0,
    'Playlist 1',
    'Scarlet',
    '\https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png',
    '', [new Song(0, 'The Song', 'The Album', 0,
      'https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png',
      'The Artist', 1), new Song(0, 'The Song', 'The Album', 0,
        'https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png', 'The Artist', 1)]);
  playlists: Playlist[] = [this.samplePlaylist];
  playlists$: Observable<Playlist[]> = of(this.playlists);

  constructor() {}

  getPlaylists(): Observable<any[]> {
    return this.playlists$;
  }

  getPlaylist(id: number): Observable<Playlist> {
    return of(this.playlists[id]);
  }

  newPlaylist(name: string) {
    this.playlists.unshift(new Playlist(this.playlists.length, `Playlist ${this.playlists.length + 1}`, 'Scarlet', '', '', [new Song(0, 'The Song', 'The Album', 0, '', 'The Artist', 1)]));
  }

  getNumberOfPlaylists(): number {
    return this.playlists.length;
  }
}
