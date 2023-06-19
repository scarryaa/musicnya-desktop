import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regexSplit',
  standalone: true,
})
export class RegexSplitPipe implements PipeTransform {
  transform(value: string | undefined, split: string): string | undefined {
    if (value === undefined || value === '' || !value) return undefined;
    return value.split(new RegExp(split)).pop()?.replace('&mt=1', '');
  }
}
