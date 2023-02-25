import { Component, EventEmitter, HostListener, Injectable } from '@angular/core';
import { injectNgxResize } from 'ngx-resize';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private utilitiesService: UtilitiesService) {}

  readonly resizeResult$ = injectNgxResize().subscribe((result) => 
    this.utilitiesService.windowResized.emit(result.width));
  
  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    this.utilitiesService.documentClickedTarget.next(event.target)
  }
  title = 'musicnya';
}

@Injectable({ providedIn: 'root' })
export class UtilitiesService {
 documentClickedTarget: Subject<HTMLElement> = new Subject<HTMLElement>()
 windowResized: EventEmitter<number> = new EventEmitter<number>();
}