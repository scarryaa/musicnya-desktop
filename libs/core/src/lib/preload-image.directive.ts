import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';

@Directive({
  selector: 'img[corePreloadImage]',
  standalone: true,
})
export class PreloadImageDirective implements OnInit {
  @Input() src!: string;

  constructor(
    private element: ElementRef,
    private changeDetectorReference: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const img = new Image();
    img.addEventListener('load', () => {
      this.element.nativeElement.style.backgroundImage = `url(${this.src})`;
    });
    img.src = this.src;
    this.changeDetectorReference.detectChanges();
  }
}
