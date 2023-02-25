import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Playlist } from 'src/app/modules/core/models/playlist';
import { Song } from 'src/app/modules/core/models/song';
import { FastAverageColor, FastAverageColorResult } from 'fast-average-color';

@Injectable({
  providedIn: 'root'
})
export class PlaylistDataService {
  private fac = new FastAverageColor();

  playlists: Playlist[] = [];
  playlists$: Observable<Playlist[]> = of(this.playlists);

  constructor() {}

  getPlaylists(): Observable<Playlist[]> {
    return this.playlists$;
  }

  getPlaylist(id: number): Observable<Playlist> {
    return of(this.playlists[id - 1]);
  }

  getPlaylistSongs(id: number): Observable<Song[]> {
    return of(this.playlists[id - 1].tracks)
  }

  async newPlaylist(name: string) {
    this.playlists.push(new Playlist(this.playlists.length + 1, `Playlist ${this.playlists.length + 1}`, 'Scarlet', '', [new Song(0, 'The Song', 'The Album', 0, 'The Artist', 270000, undefined, Date.now())], await this.getDominantColor('')));
  }

  addTrack(id: number) {
    this.playlists[id - 1].tracks.push(new Song(0, 'The Song', 'The Album', 0,
    'The Artist', 200000, 'https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png', Date.now()), new Song(1, 'The Song', 'The Album', 0,
      'The Artist', 270000, 'https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png', new Date().setDate(new Date().getDate() - 1)));
  }

  getNumberOfPlaylists(): number {
    return this.playlists.length;
  }

  async getDominantColor(artwork: string): Promise<string> {
    var color: string;
    // dark mode
    if (!artwork || artwork == undefined || artwork == '') color = 'rgb(62, 59, 59)';
    //light
    //if (!artwork || artwork == undefined || artwork == '') color = 'rgb(212, 209, 209)';
    else await this.fac.getColorAsync(artwork, {algorithm: 'simple', mode: 'speed', step: 50}).then((res: FastAverageColorResult) => color = res.rgb);
    return color!;
  }

 async getSamplePlaylist(): Promise<void> {
    // this.apiservice.getPlaylist()...
    var color = await this.getDominantColor('https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png');
    console.log(color);
    var p = new Playlist(1,
      'Playlist 1',
      'Scarlet',
      '',
      [new Song(0, 'The Song', 'The Album', 0,
        'The Artist', 200000, 'https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png', Date.now()), new Song(1, 'The Song', 'The Album', 0,
          'The Artist', 270000, 'https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png', new Date().setDate(new Date().getDate() - 1))], color, 'https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png');
        
    this.playlists.push(p);

    var newSongs = [];
    for (let index = 2; index < 1000; index++) {
      newSongs.push(new Song(index, 'The Song ' + index, 'The Album', 0,
          'The Artist', 200000, 'https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png', Date.now()));
    }

    this.playlists[0].tracks.push(...newSongs);
    return await Promise.resolve();
  }

  fetchMoreSongs(playlistId: number, offset: number): Array<Song> {
    console.log('getlist');
    return this.playlists[playlistId - 1].tracks.slice(offset, offset + 20);
  }
}
