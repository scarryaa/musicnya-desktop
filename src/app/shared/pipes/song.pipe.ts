import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'song'
})
export class SongPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) return `${value} song`;
    else return `${value} songs`;
  }

}
