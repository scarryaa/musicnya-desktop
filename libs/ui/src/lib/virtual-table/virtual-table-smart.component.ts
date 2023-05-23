import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  NgModule,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DisplayedColumns, Song, MediaTypes } from '@nyan-inc/core';
import { SongDataSource } from './song-data-source';
import { VirtualTableModule } from './virtual-table-presentation.component';
import { DataSource } from '@angular/cdk/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'ui-virtual-table',
  template: `<ui-virtual-table-presentation
    [dataSource]="dataSource"
    [displayedColumns]="displayedColumns"
    [data]="data"
    (dropEmitter)="handleDrop($event)"
    (clickEmitter)="handleClick($event)"
    [showAlbums]="showAlbums"
    [selected]="selection"
  ></ui-virtual-table-presentation>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualTableSmartComponent implements OnChanges {
  displayedColumns = DisplayedColumns;
  dataSource!: DataSource<Song>;
  selection = new SelectionModel<Song>(true, []);
  showAlbums = true;
  @Input() data!: Song[];
  @Input() mediaType?: MediaTypes;

  @HostBinding('style.width.%') width = '100';

  constructor() {
    this.dataSource = new SongDataSource(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource = new SongDataSource(changes['data'].currentValue);
    }

    if (changes['mediaType']) {
      this.mediaType = changes['mediaType'].currentValue;

      if (this.mediaType === 'album' || this.mediaType === 'library-album') {
        this.displayedColumns = ['#', 'Title', 'Duration'];
        this.showAlbums = false;
      }
    }
  }

  handleDrop(data: Song[]) {
    this.dataSource = new SongDataSource(data);
  }

  handleClick(event: Song) {
    this.selection.toggle(event);
  }
}

@NgModule({
  declarations: [VirtualTableSmartComponent],
  imports: [CommonModule, VirtualTableModule],
  exports: [VirtualTableSmartComponent],
})
export class VirtualTableSmartModule {}
