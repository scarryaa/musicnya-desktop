import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuratorDetailsComponent } from '../curator-details/curator-details.component';

@Component({
  standalone: true,
  imports: [CommonModule, CuratorDetailsComponent],
  selector: 'curator-details-entry',
  template: `<curator-details-main></curator-details-main>`,
})
export class RemoteEntryComponent {}
