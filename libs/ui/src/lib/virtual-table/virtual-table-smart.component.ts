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
import { DisplayedColumns, MediaItemTypes, Songs } from '@nyan-inc/core';
import { SongDataSource } from './song-data-source';
import { VirtualTableModule } from './virtual-table-presentation.component';
import { DataSource } from '@angular/cdk/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
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
  dataSource!: DataSource<Songs>;
  selection = new SelectionModel<Songs>(true, []);
  showAlbums = true;
  @Input() data!: Songs[];
  @Input() media!: MediaItemTypes;

  @HostBinding('style.width.%') width = '100';

  constructor() {
    this.dataSource = new SongDataSource(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource = new SongDataSource(changes['data'].currentValue);
    }

    if (changes['media']) {
      this.media = changes['media'].currentValue;

      if (this.media === 'albums' || this.media === 'library-albums') {
        this.displayedColumns = ['#', 'Title', 'Duration'];
        this.showAlbums = false;
      } else {
        this.displayedColumns = ['#', 'Title', 'Album', 'Duration'];
        this.showAlbums = true;
      }
    }
  }

  handleDrop(data: Songs[]) {
    this.dataSource = new SongDataSource(data);
  }

  handleClick(event: Songs) {
    this.selection.toggle(event);
  }
}

@NgModule({
  declarations: [VirtualTableSmartComponent],
  imports: [CommonModule, VirtualTableModule],
  exports: [VirtualTableSmartComponent],
})
export class VirtualTableSmartModule {}
