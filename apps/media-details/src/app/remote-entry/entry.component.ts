import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MediaDetailsComponent } from '../media-details/media-details.component';

@Component({
  standalone: true,
  imports: [CommonModule, MediaDetailsComponent],
  selector: 'musicnya-media-details-entry',
  template: `<musicnya-media-details></musicnya-media-details>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent {}
