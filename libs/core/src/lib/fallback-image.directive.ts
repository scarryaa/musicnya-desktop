import {
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
  @Input() src!: string;
  _fallback = './../assets/images/music_note.webp';

  constructor(private elementReference: ElementRef) {}

  ngOnInit() {
    if (!this.src || this.src === '') {
      (this.elementReference.nativeElement as HTMLImageElement).src =
        this._fallback;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      (this.elementReference.nativeElement as HTMLImageElement).src = this.src;
    }
  }

  @HostListener('error', ['$event.target'])
  onError() {
    (this.elementReference.nativeElement as HTMLImageElement).src =
      this._fallback;
  }
}
