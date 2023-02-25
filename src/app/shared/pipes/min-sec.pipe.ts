import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minSec'
})
export class MinSecPipe implements PipeTransform {
  showSeconds: boolean = true;
  showHours: boolean = false;

  transform(value: number): string {
    var valMin = (value / 60000);

    var valHrs = Math.trunc(valMin / 60);
    var valHrsStr = valHrs > 0 ? `${valHrs} hr ` : '';

    var valMinTrunc = Math.trunc(valMin);
    var valMinHrsTrunc = Math.trunc(Math.trunc(valMin) % (valHrs * 60));
    var valMinStr = valMinHrsTrunc >= 0 ? `${valMinHrsTrunc} min ` : `${valMinTrunc} min `;

    var valSecTrunc = Math.ceil((valMin % 1) * 60);
    var valSecStr = valHrs > 0 ? '' : `${valSecTrunc} sec`

    return `${valHrsStr}${valMinStr}${valSecStr}`;
  }
}