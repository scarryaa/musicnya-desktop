import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const MusicKit: any;

@NgModule({
  imports: [CommonModule],
})
export class CoreServicesModule {
  public instance!: typeof MusicKit;
}
