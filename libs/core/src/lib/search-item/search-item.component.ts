import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-search-item',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="search-item">
    <img class="search-item__image" [src]="image" />
    <div class="search-item__content">
      <div class="search-item__title">{{ title }}</div>
      <div class="search-item__subtitle">{{ subtitle }}</div>
    </div>
  </div> `,
  styleUrls: ['./search-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchItemComponent {
  @Input() image?: string;
  @Input() title?: string;
  @Input() subtitle?: string;
}
