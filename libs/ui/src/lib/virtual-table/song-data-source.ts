import { DataSource } from '@angular/cdk/collections';
import { Directive } from '@angular/core';
import { Song } from '@nyan-inc/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Directive()
export class SongDataSource extends DataSource<Song> {
  songData: Song[];
  data: BehaviorSubject<Song[]>;

  constructor(data: Song[]) {
    super();
    this.songData = data;
    this.data = new BehaviorSubject<Song[]>(this.songData);
  }

  connect(): Observable<Song[]> {
    return this.data;
  }

  disconnect() {}
}
