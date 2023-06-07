import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nyan-inc-dynamic-component-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-component-loader.component.html',
  styleUrls: ['./dynamic-component-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicComponentLoaderComponent {}
