import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[sliderValue]',
  host: {
    "(input)": 'updateValue($event)'
  }
})
export class ScrollDirective implements OnInit {
  @Input() sliderValue: number = 0;
  @Input() input: number = 0;

  constructor(private elem: ElementRef, private control: NgControl) { }

  ngOnInit(): void {
    this.sliderValue = this.control.control?.value;
  }

  @HostListener('wheel', ['$event'])
  onMousewheel(event: { wheelDelta: number; }) {
    if (event.wheelDelta > 0) {
      this.sliderValue + 5 > 100 ? this.sliderValue += (100 - this.sliderValue) : this.sliderValue += 5;
      this.control.control?.setValue(this.sliderValue);
    }
    if (event.wheelDelta < 0) {
      this.sliderValue - 5 < 0 ? this.sliderValue -= (0 + this.sliderValue) : this.sliderValue -= 5;
      this.control.control?.setValue(this.sliderValue);
    }
  }

  updateValue() {
    this.sliderValue = this.control.control?.value;
  }
}