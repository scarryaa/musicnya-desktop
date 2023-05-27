import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: 'img[coreFallbackImage]',
  standalone: true,
})
export class FallbackImageDirective implements OnInit, OnChanges {
  _fallback = './../assets/images/music_note.webp';
  @Input() src = this._fallback;

  constructor(
    private elementReference: ElementRef,
    private changeDetectorReference: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.elementReference.nativeElement.src) {
      (this.elementReference.nativeElement as HTMLImageElement).src =
        this._fallback;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    (this.elementReference.nativeElement as HTMLImageElement).src =
      this._fallback;

    if (changes['src']) {
      (this.elementReference.nativeElement as HTMLImageElement).src = this.src;
    }
  }

  @HostListener('error', ['$event.target'])
  onError() {
    (this.elementReference.nativeElement as HTMLImageElement).src =
      this._fallback;
  }

  @HostListener('load', ['$event.target'])
  onLoad() {
    if (
      this.elementReference &&
      this.elementReference.nativeElement &&
      this.src
    ) {
      this.elementReference.nativeElement.src = this.src;
      this.changeDetectorReference.detectChanges();
    }
  }

  detectChanges = () => {
    this.changeDetectorReference.markForCheck();
  };
}
