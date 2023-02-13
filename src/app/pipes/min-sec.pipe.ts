import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minSec'
})
export class MinSecPipe implements PipeTransform {

  transform(value: number): string {
    var val = (value / 60000);
    return `${Math.trunc(val)} min ${Math.ceil((val % 1) * 60)} sec`;
  }

}
