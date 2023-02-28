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

  documentClickedTarget: Subject<HTMLElement> = new Subject<HTMLElement>()
  windowResized: EventEmitter<number> = new EventEmitter<number>();
}
