import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearSlice',
  standalone: true,
  pure: true,
})
export class YearSlicePipe implements PipeTransform {
  transform(value: string): string {
    return value.slice(0, 4);
  }
}
