import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'core-chip',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    class="chip"
    [ngClass]="{ selected: selected }"
    (click)="handleSelectClick()"
  >
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  selected: boolean = false;
  public id: number = 0;
  @Output() selectEmitter = new EventEmitter<number>();

  handleSelectClick() {
    this.selectEmitter.emit(this.id);
  }
}

@Component({
  selector: 'core-chip-group',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="chip-group">
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./chip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChipGroupComponent implements AfterViewInit, OnDestroy {
  @Output() selectedChipEmitter = new EventEmitter<number>();
  destroy$ = new Subject<void>();

  @ContentChildren(ChipComponent) chips!: QueryList<ChipComponent>;

  handleChipSelect(id: number) {
    this.chips.forEach((chip) => (chip.selected = false));
    this.chips.toArray()[id].selected = true;
    this.selectedChipEmitter.emit(id);
  }

  ngAfterViewInit(): void {
    console.log(this.chips);
    this.chips.forEach((chip) => {
      chip.id = this.chips.toArray().indexOf(chip);

      chip.selectEmitter.pipe(takeUntil(this.destroy$)).subscribe((id) => {
        this.handleChipSelect(id);
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
