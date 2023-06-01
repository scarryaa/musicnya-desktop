import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { MediaOverlayComponent } from '../media-overlay/media-overlay.component';

@Directive({
  selector: '[coreMediaHoverOverlay]',
  standalone: true,
})
export class MediaHoverOverlayDirective implements AfterViewInit {
  private overlayElement?: ComponentRef<any>;
  private imageElement!: HTMLElement;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private viewContainerReference: ViewContainerRef
  ) {}

  ngAfterViewInit() {
    this.imageElement =
      this.element.nativeElement.querySelector('.overlay-item');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.imageElement?.style)
      this.imageElement.style.filter = 'brightness(0.65)';

    this.overlayElement = this.viewContainerReference.createComponent(
      MediaOverlayComponent
    );
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.imageElement?.style)
      this.imageElement.style.filter = 'brightness(1)';

    this.viewContainerReference.remove();
    this.overlayElement = undefined;
  }
}
