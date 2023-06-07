import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryEntryComponent } from '../library-entry/library-entry.component';

@Component({
  standalone: true,
  imports: [CommonModule, LibraryEntryComponent],
  selector: 'nyan-inc-browse-entry',
  template: `<library-entry></library-entry>`,
})
export class RemoteEntryComponent {}
