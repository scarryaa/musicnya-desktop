import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormatImageURLPipe } from "../formatImageURL/format-image-url.pipe";

@Component({
    selector: 'core-search-item',
    standalone: true,
    template: `<div
    (click)="clickEmitter.emit({ type: type || '', id: id || '' })"
    (keydown.enter)="clickEmitter.emit({ type: type || '', id: id || '' })"
    tabindex="0"
    class="search-item"
    [routerLink]="type === 'artists' ? ['artists', id] : ['albums', id]"
  >
    <img
      class="search-item__image"
      [src]="(image || '') | formatImageURL: 600"
      [style.borderRadius.px]="type === 'artists' ? '50' : '8'"
    />
    <div class="search-item__content">
      <div class="search-item__title">{{ title }}</div>
      <div class="search-item__subtitle">{{ subtitle }}</div>
    </div>
  </div> `,
    styleUrls: ['./search-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, FormatImageURLPipe]
})
export class SearchItemComponent {
  @Input() image?: string;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() type?: string;
  @Input() id?: string;

  @Output() clickEmitter = new EventEmitter<{ type: string; id: string }>();
}
