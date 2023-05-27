import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: 'img[corePreloadImage]',
  standalone: true,
})
export class PreloadImageDirective implements OnInit {
  @Input() src!: string;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const img = new Image();
    img.addEventListener('load', () => {
      this.element.nativeElement.style.backgroundImage = `url(${this.src})`;
    });
    img.src = this.src;
  }
}
