import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  NgModule,
} from '@angular/core';
import { DisplayedColumns, Song } from '@nyan-inc/core';
import { SongDataSource } from './song-data-source';
import { VirtualTableModule } from './virtual-table-presentation.component';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'ui-virtual-table',
  template: `<ui-virtual-table-presentation
    [dataSource]="dataSource"
    [displayedColumns]="displayedColumns"
    [data]="songArray"
    (dropEmitter)="handleDrop($event)"
  ></ui-virtual-table-presentation>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualTableSmartComponent {
  displayedColumns = DisplayedColumns;
  dataSource!: DataSource<Song>;
  songArray: Song[];

  @HostBinding('style.width.%') width = '100';

  constructor() {
    this.songArray = new Array(200).fill({
      title: 'The Song',
      album: 'The Album',
      artists: ['Guy'],
      duration: 100,
      imageSource: '',
    }) as Song[];

    this.dataSource = new SongDataSource(this.songArray);
  }

  handleDrop(data: Song[]) {
    this.dataSource = new SongDataSource(data);
  }
}

@NgModule({
  declarations: [VirtualTableSmartComponent],
  imports: [CommonModule, VirtualTableModule],
  exports: [VirtualTableSmartComponent],
})
export class VirtualTableSmartModule {}
