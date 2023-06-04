import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenu } from '@angular/cdk/menu';

@Component({
  selector: 'ui-menu',
  standalone: true,
  imports: [CommonModule, CdkMenu],
  template: `<div class="menu" cdkMenu>
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {}

@Component({
  selector: 'ui-menu-item',
  standalone: true,
  imports: [CommonModule, CdkMenu],
  template: `<div class="menu-item" cdkMenu>
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {}
