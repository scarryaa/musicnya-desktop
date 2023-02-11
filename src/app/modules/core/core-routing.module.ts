import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';

const coreRoutes: Routes = [
  {
    path: '',
    component: AuthenticationComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class CoreRoutingModule {}