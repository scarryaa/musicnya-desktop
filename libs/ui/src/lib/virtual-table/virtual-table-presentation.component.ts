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
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ui-virtual-table-presentation',
  templateUrl: './virtual-table.component.html',
  styleUrls: ['./virtual-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualTableComponent implements OnChanges {
  @Input() dataSource!: DataSource<Song>;
  @Input() data!: Song[];
  @Input() displayedColumns!: string[];
  @Output() readonly dropEmitter = new EventEmitter<Song[]>();

  trackBy(index: number, song: Song) {
    return song.id;
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
    DraggableDirective,
    DragTooltipComponent,
  ],
  exports: [VirtualTableComponent],
})
export class VirtualTableModule {}
