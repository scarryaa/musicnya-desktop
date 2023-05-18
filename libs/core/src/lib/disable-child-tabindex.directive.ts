import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[coreDisableChildTabIndex]',
  standalone: true,
})
export class DisableChildTabIndexDirective {
  @HostBinding('tabindex') tabIndex = -1;
}
