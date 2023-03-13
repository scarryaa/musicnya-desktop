import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'replaceSrcWidthHeight',
    pure: true
})
export class ReplaceSrcWidthHeightPipe implements PipeTransform {
  transform(value: string, widthHeight: string): string {
    if (value.includes(widthHeight)) return value;
    else return value.replace('{w}x{h}', widthHeight);
  }
}