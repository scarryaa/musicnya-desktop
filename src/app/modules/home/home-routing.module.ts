import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentlyPlayedComponent } from './components/recently-played/recently-played.component';

const routes: Routes = [
  {
    path: '',
    component: RecentlyPlayedComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {}