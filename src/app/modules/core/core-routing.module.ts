import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';

const coreRoutes: Routes = [
  { path: '', loadComponent: () => import('./components/settings/settings.component').then(c => c.SettingsComponent)},
  { path: '', loadComponent: () => import('./components/profile/profile.component').then(c => c.ProfileComponent)},
  { path: '', component: AuthenticationComponent }
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