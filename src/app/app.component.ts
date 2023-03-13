import { Component, HostListener } from '@angular/core';
import { injectNgxResize } from 'ngx-resize';
import { documentClickedTarget, windowResized } from './helpers/helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}

  readonly resizeResult$ = injectNgxResize().subscribe((result: any) => 
    windowResized.emit(result.width));
  
  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    documentClickedTarget.next(event.target)
  }
  title = 'musicnya';
}