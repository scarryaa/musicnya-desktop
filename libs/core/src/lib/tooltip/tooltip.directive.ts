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

@Directive({
  selector: '[coreTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input() coreTooltip = '';
  private componentRef: ComponentRef<any> | undefined = undefined;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef === undefined) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
      this.setTooltipComponentProperties();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== undefined) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }

  private setTooltipComponentProperties() {
    if (this.componentRef !== undefined) {
      this.componentRef.instance.tooltip = this.coreTooltip;
      const { left, right, bottom, top } =
        this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.left = (right - left) / 2 + left;
      this.componentRef.instance.top = (top - bottom) / 2 + top;
    }
    this.componentRef?.instance.changeDetectorRef.detectChanges();
  }
}

@NgModule({
  imports: [CommonModule, TooltipComponent],
  declarations: [TooltipDirective],
  exports: [TooltipDirective],
})
export class TooltipDirectiveModule {}
