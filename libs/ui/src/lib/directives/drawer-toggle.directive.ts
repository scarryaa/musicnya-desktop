import { Directive, HostBinding, HostListener } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Directive({
  selector: '[uiDrawerToggle]',
  standalone: true,
})
export class DrawerToggleDirective {
  private _drawerOpen = false;
  private _drawerOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public drawerOpen$: Observable<boolean> = this._drawerOpen$;

  @HostListener('click', ['$event'])
  onClick() {
    this._drawerOpen = this._drawerOpen ? false : true;
    this._drawerOpen$.next(this._drawerOpen);
  }
}
