import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';

@Directive()
export abstract class BaseComponent {
  constructor(
    private changeReference: ChangeDetectorRef,
    public elementReference: ElementRef,
    public router: Router
  ) {}

  @Input() componentStyleClass!: string;
  @HostBinding('id') @Input() id = 'baseComponent';

  setClass(...classes: string[]) {
    this.componentStyleClass = classes.join(' ');
    this.changeReference.markForCheck();
  }

  setStyle(
    selector: keyof HTMLElementTagNameMap | string,
    property: string,
    value: string
  ): void {
    if (selector.includes('self')) {
      selector.replace('self,', '');

      (this.elementReference.nativeElement as HTMLElement).style.setProperty(
        property,
        value
      );
    }

    (this.elementReference.nativeElement as HTMLElement)
      .querySelectorAll(selector)
      // eslint-disable-next-line unicorn/no-array-for-each
      .forEach((item) =>
        (item as HTMLElement).style.setProperty(property, value)
      );
  }

  toggleButtonWidth(): void {
    return undefined;
  }
}
