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
import { DisplayedColumns, Song } from '@nyan-inc/core';
import { SongDataSource } from './song-data-source';
import { VirtualTableModule } from './virtual-table-presentation.component';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'ui-virtual-table',
  template: `<ui-virtual-table-presentation
    [dataSource]="dataSource"
    [displayedColumns]="displayedColumns"
    [data]="data"
    (dropEmitter)="handleDrop($event)"
  ></ui-virtual-table-presentation>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualTableSmartComponent implements OnChanges {
  displayedColumns = DisplayedColumns;
  dataSource!: DataSource<Song>;
  @Input() data!: Song[];

  @HostBinding('style.width.%') width = '100';

  constructor() {
    this.dataSource = new SongDataSource(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource = new SongDataSource(changes['data'].currentValue);
    }
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
