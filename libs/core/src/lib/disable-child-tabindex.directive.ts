import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[coreDisableChildTabIndex]',
  standalone: true,
})
export class DisableChildTabIndexDirective {
  @HostBinding('tabIndex') tabIndex = -1;
  @HostBinding('tabindex') tabindex = -1;
}
