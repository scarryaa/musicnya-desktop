import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  standalone: true,
  imports: [CommonModule, SettingsComponent],
  selector: 'settings-settings-entry',
  template: `<musicnya-settings></musicnya-settings>`,
})
export class RemoteEntryComponent {}
