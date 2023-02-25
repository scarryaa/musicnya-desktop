import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaylistComponent } from './playlist.component';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<PlaylistComponent> {
  canDeactivate(component: PlaylistComponent) {
    return component.resetColorAndLeave();
  }
  
}
