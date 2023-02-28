import { Component, HostListener } from '@angular/core';
import { injectNgxResize } from 'ngx-resize';
import { UtilityService } from './shared/services/utility/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private utilityService: UtilityService) {}

  readonly resizeResult$ = injectNgxResize().subscribe((result) => 
    this.utilityService.windowResized.emit(result.width));
  
  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    this.utilityService.documentClickedTarget.next(event.target)
  }
  title = 'musicnya';
}