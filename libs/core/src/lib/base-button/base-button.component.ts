import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgModule,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../base-component';
import { Router, RouterModule } from '@angular/router';
import { DisableChildFocusDirective } from '../disable-child-focus.directive';

@Component({
  selector: 'core-base-button',
  template: `
    <button
      class="button"
      type="button"
      [ngClass]="componentStyleClass"
      [style]="buttonStyle"
      [tabIndex]="tabIndex"
      #button
      [style.transition]="transition"
      coreDisableChildFocus
    >
      <i
        class="material-symbols-rounded text-5xl"
        [ngClass]="componentStyleClass"
        >{{ icon }}</i
      >
      <span #span>{{ text }}</span>
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./base-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BaseComponent, useExisting: BaseButtonComponent }],
})
export class BaseButtonComponent extends BaseComponent {
  @Input() buttonStyle!: string;
  @Input() transition = '';
  @Input() tabIndex!: number;
  @Input() icon!: string;
  @Input() text!: string;
  @Input() routerLink!: string;
  @Input() routerLinkActiveOptions!: { exact: boolean };
  @Input() ngClass!: { [klass: string]: any } | string | string[] | Set<string>;
  @Input() cdkDragStartDelay = 0;

  @ViewChildren('span', { read: ElementRef })
  spanElements!: QueryList<ElementRef>;

  @ViewChildren('button', { read: ElementRef })
  buttonElements!: QueryList<ElementRef>;

  constructor(
    reference: ChangeDetectorRef,
    elementReference: ElementRef,
    router: Router
  ) {
    super(reference, elementReference, router);
  }
}

@NgModule({
  imports: [CommonModule, RouterModule, DisableChildFocusDirective],
  exports: [BaseButtonComponent],
  declarations: [BaseButtonComponent],
})
export class BaseButtonModule {}
