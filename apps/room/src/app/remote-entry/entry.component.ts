import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../main/main.component';

@Component({
  standalone: true,
  imports: [CommonModule, MainComponent],
  selector: 'nyan-inc-room-entry',
  template: `<rooms-main></rooms-main>`
})
export class RemoteEntryComponent {}
