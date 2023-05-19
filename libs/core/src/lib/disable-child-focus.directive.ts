import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[coreDisableChildFocus]',
  standalone: true,
})
export class DisableChildFocusDirective {
  @HostListener('click', ['$event']) onClick(event: Event) {
    event.preventDefault();
    return false;
  }
}
