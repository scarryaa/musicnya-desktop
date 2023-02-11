import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentlyPlayedComponent } from './components/recently-played/recently-played.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    RecentlyPlayedComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports: [RecentlyPlayedComponent]
})
export class HomeModule { }
