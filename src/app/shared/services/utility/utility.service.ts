import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor() {}

  stripRgb(color: string): string {
    return color.replace('rgb(', '').replace(')', '');
  }

  hexToRgb(hex: string): string | null {
    hex = hex.replace('#', '');
    var bigint = parseInt(hex, 16);
    return 'rgb(' + [(bigint = parseInt(hex, 16)) >> 16 & 255, bigint >> 8 & 255, bigint & 255].join() + ')';
  }

  rgbToHex(rgb: string) {
    var r, g, b: number;
    [r, g, b] = this.stripRgb(rgb).split(',').map(res => parseInt(res));
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }

  documentClickedTarget: Subject<HTMLElement> = new Subject<HTMLElement>()
  windowResized: EventEmitter<number> = new EventEmitter<number>();
}
