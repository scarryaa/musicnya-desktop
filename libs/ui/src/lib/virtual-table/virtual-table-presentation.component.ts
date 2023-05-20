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
import { DragTooltipComponent, DraggableDirective, Song } from '@nyan-inc/core';
import {
  CdkDragDrop,
  CdkDragStart,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'ui-virtual-table-presentation',
  templateUrl: './virtual-table.component.html',
  styleUrls: ['./virtual-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualTableComponent implements OnChanges {
  selection = new SelectionModel<Song>(true, []);

  @Input() dataSource!: DataSource<Song>;
  @Input() data!: Song[];
  @Input() displayedColumns!: string[];
  @Output() readonly dropEmitter = new EventEmitter<Song[]>();
  dragData: { title: string; artists: string[] } = { title: '', artists: [] };

  trackBy(index: number, song: Song) {
    return song.id;
  }

  onDragStart(event: CdkDragStart) {
    console.log(event.source.data);
    console.log(event.source);
    this.dragData.title = event.source.data.title;
    this.dragData.artists = event.source.data.artists;
  }

  drop(event: CdkDragDrop<string[]>) {
    // Rearrange the data in the array
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    this.dropEmitter.emit(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = changes['dataSource'].currentValue as DataSource<Song>;
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
  ],
  exports: [VirtualTableComponent],
})
export class VirtualTableModule {}
