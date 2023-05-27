import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var MusicKit: any;

@NgModule({
  imports: [CommonModule],
})
export class CoreServicesModule {
  public instance!: typeof MusicKit;

  constructor() {}
}
