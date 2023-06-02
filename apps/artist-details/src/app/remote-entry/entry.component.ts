import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistDetailsComponent } from '../artist-details/artist-details.component';

@Component({
  standalone: true,
  imports: [CommonModule, ArtistDetailsComponent],
  selector: 'artist-details-entry',
  template: `<artist-details-main></artist-details-main>`,
})
export class RemoteEntryComponent {}
