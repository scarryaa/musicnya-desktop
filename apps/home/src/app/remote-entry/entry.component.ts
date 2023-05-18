import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';

@Component({
  standalone: true,
  imports: [CommonModule, HomeComponent],
  selector: 'musicnya-home-entry',
  template: `<musicnya-home></musicnya-home>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent {}
