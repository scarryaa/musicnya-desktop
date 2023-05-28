import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  HostBinding,
  HostListener,
  Input,
  NgModule,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-slider',
  template: `<input
    type="range"
    class="slider"
    #slider
    [min]="min"
    [max]="max"
    [value]="value"
    [step]="1"
    [style.width.rem]="width"
  />`,
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements OnChanges {
  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 0;
  @Output() valueChange: EventEmitter<number> = new EventEmitter();
  @Output() dragging = new EventEmitter<number>();
  @Output() dragStop = new EventEmitter<number>();

  @HostBinding('style.width.rem') @Input() width!: number;

  @ViewChild('slider', { read: ElementRef }) slider!: ElementRef;

  @HostListener('input', ['$event'])
  onInput(event: any) {
    this.updateGradient();
    this.dragging.emit(event.value);
    this.value = event.target.value;
    this.valueChange.emit(this.value);
    this.updateGradient();
  }

  @HostListener('change', ['$event.target'])
  onChange(event: any) {
    this.updateGradient();
    this.dragging.emit(event.value);
    this.dragStop.emit(event.value);
    console.log('change', event);
    this.value = event.value;
    this.valueChange.emit(this.value);
    this.updateGradient();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.value = changes['value'].currentValue;
      this.valueChange.emit(this.value);

      if (this.slider) this.updateGradient();
    }
  }

  updateGradient() {
    const slider = this.slider.nativeElement as HTMLInputElement;
    let percentage =
      ((Number.parseInt(slider.value, 10) - Number.parseInt(slider.min, 10)) /
        Number.parseInt(slider.max, 10) -
        Number.parseInt(slider.min, 10)) *
      100;
    if (percentage < 20 && percentage > 0) {
      percentage += 3;
    } else if (
      (percentage > 80 && this.width > 10) ||
      this.width == undefined
    ) {
      percentage -= 1;
    }

    slider.style.setProperty('--percentage', `${percentage}%`);
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [SliderComponent],
  declarations: [SliderComponent],
})
export class SliderModule {}
