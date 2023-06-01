import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  DisplayedColumns,
  MediaItemTypes,
  SongDataSource,
  Songs,
} from '@nyan-inc/core';
import { VirtualTableModule } from './virtual-table-presentation.component';
import { DataSource } from '@angular/cdk/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, RouterModule } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ui-virtual-table',
  template: `<ui-virtual-table-presentation
    [dataSource]="dataSource"
    [displayedColumns]="displayedColumns"
    [data]="data"
    (dropEmitter)="handleDrop($event)"
    (clickEmitter)="handleClick($event)"
    (titleClickEmitter)="handleTitleClick($event)"
    (doubleClickEmitter)="handleDoubleClickIndex($event)"
    [showAlbums]="showAlbums"
    [playingSong]="playingSong"
    [selected]="selection"
    [playing]="playing"
    (playEmitter)="unpauseEmitter.emit()"
    (pauseEmitter)="pauseEmitter.emit()"
  ></ui-virtual-table-presentation>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualTableSmartComponent implements OnChanges, OnDestroy {
  displayedColumns = DisplayedColumns;
  dataSource!: DataSource<Songs>;
  selection = new SelectionModel<Songs>(true, []);
  showAlbums = true;
  destroy$ = new Subject<void>();

  @Input() data!: Songs[];
  @Input() media!: MediaItemTypes;
  @Input() playingSong: string | undefined = undefined;
  @Input() playing = false;
  @Input() routeChanges!: Observable<void>;

  @Output() unpauseEmitter = new EventEmitter();
  @Output() pauseEmitter = new EventEmitter();
  @Output() idEmitter = new EventEmitter<string>();
  @Output() dropEmitter = new EventEmitter<Songs[]>();
  @Output() indexEmitter = new EventEmitter<number>();

  @HostBinding('style.width.%') width = '100';

  // listen to router events and clear selection if the route changes

  constructor(private router: Router) {
    this.dataSource = new SongDataSource(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource = new SongDataSource(changes['data'].currentValue);
    }

    if (changes['media']) {
      this.selection.clear();
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

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  handleDrop(data: Songs[]) {
    this.dataSource = new SongDataSource(data);
  }

  handleClick(event: Songs) {
    this.selection.toggle(event);
  }

  handleTitleClick(albumId: string) {
    this.router.navigate(['media/albums/', albumId]);
  }

  handleDoubleClickIndex(event: number) {
    this.indexEmitter.emit(event);
  }

  handleDoubleClickId(event: string) {
    this.idEmitter.emit(event);
  }
}

@NgModule({
  declarations: [VirtualTableSmartComponent],
  imports: [CommonModule, VirtualTableModule, RouterModule],
  exports: [VirtualTableSmartComponent],
})
export class VirtualTableSmartModule {}
