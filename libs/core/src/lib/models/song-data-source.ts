import { DataSource } from '@angular/cdk/collections';
import { Directive } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Songs } from './music.types';

@Directive()
export class SongDataSource extends DataSource<Songs> {
  songData: Songs[];
  data: BehaviorSubject<Songs[]>;

  constructor(data: Songs[]) {
    super();
    this.songData = data;
    this.data = new BehaviorSubject<Songs[]>(this.songData);
  }

  connect(): Observable<Songs[]> {
    return this.data;
  }

  disconnect() {}
}
