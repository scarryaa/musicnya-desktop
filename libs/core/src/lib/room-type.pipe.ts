import { Pipe, PipeTransform } from '@angular/core';

export enum RoomType {
  fcId = 'fcId',
  pp = 'pp',
  id = 'id',
  curator = 'curator',
  none = 'none',
}

@Pipe({
  name: 'roomType',
  standalone: true,
})
export class RoomTypePipe implements PipeTransform {
  transform(
    value: string | undefined
  ): 'fcId' | 'pp' | 'id' | 'curators' | 'apple-curators' | 'none' {
    if (value === undefined || value === '' || !value) return 'none';
    if (value.includes('fcId')) return 'fcId';
    if (value.includes('pp')) return 'pp';
    if (value.includes('id')) return 'id';
    if (value.includes('curators')) return 'curators';
    if (value.includes('apple-curators')) return 'apple-curators';
    return 'none';
  }
}
