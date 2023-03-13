import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'song'
})
export class SongPipe implements PipeTransform {

  transform(value: number | string): string {
    if (typeof value === 'string') value = parseInt(value);
    if (value == 1) return `${value} song`;
    else return `${value} songs`;
  }

}
