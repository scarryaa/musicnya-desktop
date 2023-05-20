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
  OnDestroy,
} from '@angular/core';
import { DragTooltipComponent } from '../drag-tooltip/drag-tooltip.component';

@Directive({
  selector: '[coreDraggable]',
  standalone: true,
})
export class DraggableDirective implements OnDestroy {
  private context: any = {};
  private dragging = false;
  private firstClick = true;
  private componentRef: ComponentRef<any> | undefined = undefined;
  @Input() coreDraggable = '';
  mouseX = 0;
  mouseY = 0;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  @HostListener('mousedown', ['$event'])
  onMouseEnter(event: MouseEvent): void {
    if (this.componentRef === undefined && event.button === 0) {
      this.dragging = true;
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(
          DragTooltipComponent
        );

      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
      this.mouseX = event.clientX + 15;
      this.mouseY = event.clientY;

      if ((event.target as Element).attributes.getNamedItem('coreDraggable')) {
        this.setTooltipComponentProperties((event.target as Element).innerHTML);
      }
    }
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent): void {
    if (this.componentRef !== undefined && this.dragging) {
      this.firstClick = false;
      this.mouseX = event.clientX + 15;
      this.mouseY = event.clientY;
      this.setTooltipComponentProperties();
      this.componentRef.instance.changeDetectorRef.detectChanges();
    }
  }

  @HostListener('mouseup') onMouseUp() {
    this.dragging = false;
    this.firstClick = true;
    this.destroy();
  }

  private setTooltipComponentProperties(tooltip?: string) {
    if (this.componentRef !== undefined) {
      if (this.firstClick) {
        this.componentRef.instance.tooltip = tooltip;
      }
      this.componentRef.instance.left = this.mouseX;
      this.componentRef.instance.top = this.mouseY;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== undefined) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef?.destroy();
      this.componentRef = undefined;
    }
  }
}
