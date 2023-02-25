import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'img[src]',
  host: {
    '[src]': 'checkPath(src)',
    '(error)': 'onError()'
},
standalone: true
})
export class FallbackSrc {

  @Input() src!: string;
  public defaultImg: string = 'assets/img/album_cover_placeholder.png';
  public onError() {
      this.src = this.defaultImg;
  }
  public checkPath(src: any) {
      return src ? src : this.defaultImg;
  }
}