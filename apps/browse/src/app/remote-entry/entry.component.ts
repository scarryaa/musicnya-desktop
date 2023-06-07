import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from '../browse/browse.component';

@Component({
  standalone: true,
  imports: [CommonModule, BrowseComponent],
  selector: 'nyan-inc-browse-entry',
  template: `<browse-entry></browse-entry>`,
})
export class RemoteEntryComponent {}
