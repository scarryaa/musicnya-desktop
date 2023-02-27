import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { ElectronService } from '../electron/electron.service';

@Injectable({
  providedIn: 'root'
})
export class UserPrefsService {

  constructor(private electronService: ElectronService) {}

  private drawerCollapsed: boolean = false;
  public drawerCollapsed$: BehaviorSubject<boolean> = new BehaviorSubject(this.drawerCollapsed);
  private platformWin: boolean = true;

  toggleDrawer(): void {
    this.drawerCollapsed = !this.drawerCollapsed;
    this.drawerCollapsed$.next(this.drawerCollapsed);
  }

  getUserPrimaryColor(): any {
    return new Observable<string>((observer: Subscriber<string>) => { 
      this.electronService.getIpcRenderer().receive('getUserPrimaryColor', (event: any, arg: any) => {
        observer.next(arg);
      });

      this.electronService.getIpcRenderer().send("toMain", {command: 'getUserPrimaryColor'});
    });
  }

  setPlatform(isWin: boolean): void {
    this.platformWin = isWin;
  }

  isWindows(): boolean {
    return this.platformWin;
  }

  getUserSecondaryColor(): any {
    return new Observable<string>((observer: Subscriber<string>) => { 
      this.electronService.getIpcRenderer().receive('getUserSecondaryColor', (event: any, arg: any) => {
        observer.next(arg);
      });

      this.electronService.getIpcRenderer().send("toMain", {command: 'getUserSecondaryColor'});
    });
  }

  setUserPrimaryColor(color: string): void {
    this.electronService.getIpcRenderer().send("toMain", {command: 'storeUserPrimaryColor', data: color});
  }

  setUserSecondaryColor(color: string): void {
    this.electronService.getIpcRenderer().send("toMain", {command: 'storeUserSecondaryColor', data: color});
  }

  //TODO: create data object
}
