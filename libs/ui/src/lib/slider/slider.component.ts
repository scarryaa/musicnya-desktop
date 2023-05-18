import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  NgModule,
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
    [style.width.rem]="width"
  />`,
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 0;

  @HostBinding('style.width.rem') @Input() width!: number;

  @ViewChild('slider', { read: ElementRef }) slider!: ElementRef;

  @HostListener('input', ['$event'])
  onInput() {
    this.updateGradient();
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
