import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from '../radio/radio.component';

@Component({
  standalone: true,
  imports: [CommonModule, RadioComponent],
  selector: 'nyan-inc-radio-entry',
  template: `<radio-entry></radio-entry>`,
})
export class RemoteEntryComponent {}
