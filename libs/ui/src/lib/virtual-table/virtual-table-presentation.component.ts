import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule, DataSource } from '@angular/cdk/table';
import {
  DragTooltipComponent,
  DraggableDirective,
  Songs,
  AlbumTileModule,
} from '@nyan-inc/core';
import {
  CdkDragDrop,
  CdkDragStart,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SelectionModel } from '@angular/cdk/collections';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-virtual-table-presentation',
  templateUrl: './virtual-table.component.html',
  styleUrls: ['./virtual-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualTableComponent implements OnChanges {
  @Input() dataSource!: DataSource<Songs>;
  @Input() data!: Songs[];
  @Input() displayedColumns!: string[];
  @Input() showAlbums = true;
  @Input() selected = new SelectionModel<Songs>(true, []);
  @Input() playingSong: string | undefined = undefined;
  @Input() playing = false;
  @Output() readonly dropEmitter = new EventEmitter<Songs[]>();
  @Output() readonly clickEmitter = new EventEmitter<Songs>();
  @Output() readonly titleClickEmitter = new EventEmitter<string>();
  @Output() readonly doubleClickEmitter = new EventEmitter<number>();
  @Output() readonly pauseEmitter = new EventEmitter();
  @Output() readonly playEmitter = new EventEmitter();

  dragData: { title: string; artists: string[] } = { title: '', artists: [] };

  trackBy(_index: number, song: Songs) {
    return song.id;
  }

  playSong(event: MouseEvent, index: number) {
    this.doubleClickEmitter.emit(index);
    event.stopPropagation();
  }

  unpauseSong(event: MouseEvent) {
    this.playEmitter.emit();
    event.stopPropagation();
  }

  pauseSong(event: MouseEvent) {
    this.pauseEmitter.emit();
    event.stopPropagation();
  }

  handleTitleClick(event: MouseEvent, albumId: string) {
    this.titleClickEmitter.emit(albumId);
    event.stopPropagation();
  }

  handleDoubleClick(event: MouseEvent, clickedSong: number) {
    this.doubleClickEmitter.emit(clickedSong);
    event.stopPropagation();
  }

  onDragStart(event: CdkDragStart) {
    console.log(event.source.data);
    console.log(event.source);
    this.dragData.title = event.source.data.title;
    this.dragData.artists = event.source.data.artists;
  }

  handleClick(event: MouseEvent) {}

  drop(event: CdkDragDrop<string[]>) {
    // Rearrange the data in the array
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    this.dropEmitter.emit(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['dataSource']?.currentValue) return;
    this.dataSource = changes['dataSource']?.currentValue as DataSource<Songs>;
  }
}
@NgModule({
  declarations: [VirtualTableComponent],
  imports: [
    CommonModule,
    CdkTableModule,
    DragDropModule,
    DragTooltipComponent,
    DraggableDirective,
    ScrollingModule,
    AlbumTileModule,
    RouterModule,
  ],
  exports: [VirtualTableComponent],
})
export class VirtualTableModule {}
