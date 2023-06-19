import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatImageURL',
  standalone: true
})
export class FormatImageURLPipe implements PipeTransform {

  transform(value: string, size: number): string {
    return value.replace('{w}x{h}', `${size}x${size}`).replace('{c}', '').replace('{f}', 'webp');
  }

}
