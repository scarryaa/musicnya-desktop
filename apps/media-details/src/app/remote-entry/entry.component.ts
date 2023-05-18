import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'nyan-inc-media-details-entry',
  template: `<nyan-inc-nx-welcome></nyan-inc-nx-welcome>`,
})
export class RemoteEntryComponent {}
