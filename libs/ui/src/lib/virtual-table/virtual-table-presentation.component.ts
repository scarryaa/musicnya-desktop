import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { MusicKit } from 'libs/shared/data-store/src/types';

@Component({
  selector: 'ui-virtual-table-presentation',
  templateUrl: './virtual-table.component.html',
  styleUrls: ['./virtual-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualTableComponent implements OnChanges, AfterViewChecked {
  @Input() dataSource!: DataSource<Songs>;
  @Input() data!: Songs[];
  @Input() displayedColumns!: string[];
  @Input() showAlbums = true;
  @Input() selected = new SelectionModel<Songs>(true, []);
  @Input() playingSong: string | undefined = undefined;
  @Input() playing = false;
  @Input() ratings?: any[] | null = [];
  @Output() readonly dropEmitter = new EventEmitter<Songs[]>();
  @Output() readonly clickEmitter = new EventEmitter<Songs>();
  @Output() readonly loveClickEmitter = new EventEmitter<{
    type: string;
    id: string;
  }>();
  @Output() readonly titleClickEmitter = new EventEmitter<string>();
  @Output() readonly doubleClickEmitter = new EventEmitter<number>();
  @Output() readonly pauseEmitter = new EventEmitter();
  @Output() readonly playEmitter = new EventEmitter();

  constructor(private changeReference: ChangeDetectorRef) {}

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

  handleLoveClick(event: MouseEvent, params: { type: string; id: string }) {
    event.stopPropagation();
    this.loveClickEmitter.emit({ type: params.type, id: params.id });
  }

  handleClick(event: MouseEvent) {}

  drop(event: CdkDragDrop<string[]>) {
    // Rearrange the data in the array
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    this.dropEmitter.emit(this.data);
  }

  ngAfterViewChecked(): void {
    this.changeReference.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.ratings);
    console.log(changes);
    if (changes['dataSource']?.currentValue) {
      this.dataSource = changes['dataSource']
        ?.currentValue as DataSource<Songs>;
    }

    if (changes['ratings']?.currentValue) {
      this.ratings = changes['ratings']?.currentValue;
      console.log(this.ratings);
    }
    this.changeReference.detectChanges();
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
