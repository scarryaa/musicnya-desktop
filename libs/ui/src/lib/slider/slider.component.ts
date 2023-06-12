import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  HostBinding,
  HostListener,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, fromEvent, Subscription, tap, throttleTime } from 'rxjs';

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
    />
    <div class="slider-track" [style.width.%]="value"></div>`,
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements AfterViewInit, OnChanges, OnDestroy {
  private subscriptions: Subscription[] = [];
  private isDragging = false;

  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 0;
  @Output() valueChange: EventEmitter<number> = new EventEmitter();
  @Output() dragging = new EventEmitter<number>();
  @Output() dragStop = new EventEmitter<number>();

  @HostBinding('style.width.rem') @Input() width!: number;
  @ViewChild('slider', { read: ElementRef }) slider!: ElementRef;

  constructor(private changeReference: ChangeDetectorRef) {}

  updateValue(value: number) {
    this.value = value;
    this.changeReference.detectChanges();
  }

  ngAfterViewInit() {
    const inputEvents$ = fromEvent(this.slider.nativeElement, 'input');
    const changeEvents$ = fromEvent(this.slider.nativeElement, 'change');

    this.subscriptions.push(
      inputEvents$
        .pipe(
          tap((event: any) => {
            this.isDragging = true;
            this.value = event.target.value;
          }),
          tap((event: any) => {
            this.dragging.emit(this.value);
          })
        )
        .subscribe(),

      changeEvents$
        .pipe(
          tap((event: any) => {
            this.isDragging = false;
            this.value = event.target.value;
            this.valueChange.emit(this.value);
            this.dragStop.emit(this.value);
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && this.slider?.nativeElement) {
      this.value = changes['value'].currentValue;
      this.valueChange.emit(this.value);
    }
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [SliderComponent],
  declarations: [SliderComponent],
})
export class SliderModule {}
