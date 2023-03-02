import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {
  public hue!: string;
  @Output() colorChange$ = new EventEmitter<string>(true);
  public color!: string;
  @Input() parent: any;

  colorChanged(color: string) {
    this.colorChange$.emit(color);
    this.color = color;
  }
}
