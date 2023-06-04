import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  NgModule,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { TooltipPosition, TooltipTheme } from './tooltip.enums';

@Directive({
  selector: '[coreTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input() coreTooltip = '';
  @Input() position: TooltipPosition = TooltipPosition.DEFAULT;
  @Input() theme: TooltipTheme = TooltipTheme.DEFAULT;
  @Input() showDelay = 0;
  @Input() hideDelay = 0;

  private componentRef: ComponentRef<any> | undefined = undefined;
  private showTimeout?: number;
  private hideTimeout?: number;

  constructor(
    private elementReference: ElementRef,
    private appReference: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef === undefined) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.appReference.attachView(this.componentRef.hostView);
      const domElement = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      document.body.append(domElement);
      this.setTooltipComponentProperties();
      this.showTimeout = window.setTimeout(
        this.showTooltip.bind(this),
        this.showDelay
      );
    }
  }

  private showTooltip() {
    if (this.componentRef !== undefined) {
      this.componentRef.instance.visible = true;
      this.componentRef.instance.changeDetectorRef.detectChanges();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hideTimeout = window.setTimeout(
      this.destroy.bind(this),
      this.hideDelay
    );
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== undefined) {
      clearTimeout(this.showTimeout);
      this.appReference.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }

  private setTooltipComponentProperties() {
    if (this.componentRef !== undefined) {
      this.componentRef.instance.tooltip = this.coreTooltip;
      this.componentRef.instance.position = this.position;

      const { left, right, top, bottom } =
        this.elementReference.nativeElement.getBoundingClientRect();

      switch (this.position) {
        case TooltipPosition.BELOW: {
          this.componentRef.instance.left = Math.round(
            (right - left) / 2 + left
          );
          this.componentRef.instance.top = Math.round(bottom);
          break;
        }
        case TooltipPosition.ABOVE: {
          this.componentRef.instance.left = Math.round(
            (right - left) / 2 + left
          );
          this.componentRef.instance.top = Math.round(top);
          break;
        }
        case TooltipPosition.RIGHT: {
          this.componentRef.instance.left = Math.round(right);
          this.componentRef.instance.top = Math.round(top + (bottom - top) / 2);
          break;
        }
        case TooltipPosition.LEFT: {
          this.componentRef.instance.left = Math.round(left);
          this.componentRef.instance.top = Math.round(top + (bottom - top) / 2);
          break;
        }
        default: {
          break;
        }
      }
    }
  }
}

@NgModule({
  imports: [CommonModule, TooltipComponent],
  declarations: [TooltipDirective],
  exports: [TooltipDirective],
})
export class TooltipDirectiveModule {}
