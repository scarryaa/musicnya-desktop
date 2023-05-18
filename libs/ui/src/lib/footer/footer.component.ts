import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';

@Component({
  selector: 'ui-footer',
  template: `
    <div class="footer-start">
      <ng-content select="[start]"></ng-content>
    </div>
    <div class="footer-center">
      <ng-content select="[center]"></ng-content>
    </div>
    <div class="footer-end">
      <ng-content select="[end]"></ng-content>
    </div>
  `,
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}

@NgModule({
  imports: [CommonModule],
  exports: [FooterComponent],
  declarations: [FooterComponent],
})
export class FooterModule {}
