import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  NgModule,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DisplayedColumns, MediaItemTypes, Songs } from '@nyan-inc/core';
import { SongDataSource } from './song-data-source';
import { VirtualTableModule } from './virtual-table-presentation.component';
import { DataSource } from '@angular/cdk/table';
import { SelectionModel } from '@angular/cdk/collections';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-virtual-table',
  template: `<ui-virtual-table-presentation
    [dataSource]="dataSource"
    [displayedColumns]="displayedColumns"
    [data]="data"
    (dropEmitter)="handleDrop($event)"
    (clickEmitter)="handleClick($event)"
    (doubleClickEmitter)="handleDoubleClick($event)"
    [showAlbums]="showAlbums"
    [playingSong]="playingSong"
    [selected]="selection"
    [playing]="playing"
    (playEmitter)="unpauseEmitter.emit()"
    (pauseEmitter)="pauseEmitter.emit()"
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
  @Input() playingSong: string | undefined = undefined;
  @Input() playing = false;

  @Output() unpauseEmitter = new EventEmitter();
  @Output() pauseEmitter = new EventEmitter();
  @Output() doubleClickEmitter = new EventEmitter<Songs>();

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

  handleDoubleClick(event: Songs) {
    this.doubleClickEmitter.emit(event);
  }
}

@NgModule({
  declarations: [VirtualTableSmartComponent],
  imports: [CommonModule, VirtualTableModule, RouterModule],
  exports: [VirtualTableSmartComponent],
})
export class VirtualTableSmartModule {}
