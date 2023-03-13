import { BreakpointObserver } from '@angular/cdk/layout';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { MusickitStore } from 'ngx-apple-music';

@Component({
  selector: 'app-virtual-scroll-table',
  templateUrl: './virtual-scroll-table.component.html',
  styleUrls: ['./virtual-scroll-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualScrollTableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;
  @Input() rows!: Array<any>;

  constructor(
  private ref: ChangeDetectorRef, private breakpointObserver: BreakpointObserver, private musickitStore: MusickitStore) {}
  
  static BUFFER_SIZE = 3;
  rowHeight = 55;
  headerHeight = 0;
  dataSource = new TableVirtualScrollDataSource<MusicKit.Songs>();
  timer!: any;
  preventSimpleClick!: boolean;
  displayedColumns: string[] = ['id', 'title', 'album', 'dateAdded', 'duration'];
  displayedColumnsMed: string[] = ['id', 'title', 'album', 'dateAdded', 'duration'];
  displayedColumnsSm: string[] = ['id', 'title', 'album', 'duration'];

  ngOnInit(): void {
    this.dataSource.data = this.rows;
    this.dataSource.sort = this.sort;
    this.breakpointObserver
    .observe(["(max-width: 1100px)"])
    .subscribe(result => {
      if (result.matches) {
        this.displayedColumns = this.displayedColumnsSm;
      } else {
        this.displayedColumns = this.displayedColumnsMed;
      }
      this.ref.detectChanges();
    });
  }

  ngAfterViewInit(): void {        
    this.dataSource.data = this.rows;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rows'].currentValue != changes['rows'].previousValue) {
      this.rows = changes['rows'].currentValue;
      this.dataSource.data = this.rows;
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
}

  trackBySongId(index: number, item: MusicKit.Songs) {
    return index;
  }

  selectRow(row: any) {
    this.timer = 0;
    this.preventSimpleClick = false;
    let delay = 250;

    this.timer = setTimeout(() => {
      if (!this.preventSimpleClick) {
        console.log('selected');
      }
    }, delay);
  }

  playSong(id: any) {
    this.preventSimpleClick = true;
    clearTimeout(this.timer);

    this.musickitStore.startPlayingSong(id);
  }

  playSongFromId(id: string) {
    this.musickitStore.startPlayingSong(id);
  }
}