import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';

@Component({
  standalone: true,
  imports: [CommonModule, SearchComponent],
  selector: 'musicnya-search-entry',
  template: `<musicnya-search></musicnya-search>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent {}
