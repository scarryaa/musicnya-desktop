import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform<T extends any[]>(array: T): string {
    return array.join(', ');
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [JoinPipe],
  exports: [JoinPipe],
})
export class JoinPipeModule {}
