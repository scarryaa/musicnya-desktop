import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';

@Directive({
    selector: '[textAutoFit]',
    exportAs: 'textAutoFit'
})
export class TextAutoFit {
    constructor(public el: ElementRef) {
        fromEvent(window, 'resize').pipe(
            debounceTime(1))
            .subscribe((event) => {
            el.nativeElement.style.fontSize = 'calc(1vw + 2.5rem)';
              this.resizeText();
            });
    }

    public resizeText() {
        console.log('running');
        let fontSize = window.getComputedStyle(this.el.nativeElement).fontSize;
        this.el.nativeElement.style.fontSize = (parseFloat(fontSize) - 1) + 'px';

        console.log(this.el.nativeElement.clientHeight);
        console.log(this.el.nativeElement.parentElement.clientHeight);
        if (this.el.nativeElement.clientHeight >= this.el.nativeElement.parentElement.clientHeight) {
            this.resizeText();
        }
    }
}