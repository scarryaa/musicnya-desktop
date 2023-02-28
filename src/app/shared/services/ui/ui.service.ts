import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ElectronService } from '../electron/electron.service';
import { UserPrefsService } from '../user-prefs/user-prefs.service';
import { CurrentPlatform } from './current-platform';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(private electronService: ElectronService, private userPrefsService: UserPrefsService) { }

  private headerTitle = new BehaviorSubject<string>('');
  headerTitle$ = this.headerTitle.asObservable();
  headerOpacity$ = new BehaviorSubject<number>(0);
  enableWindowControls: boolean = environment.enableWindowControls;
  currentPlatform: CurrentPlatform = CurrentPlatform.Win;
  scrollPosition$ = new BehaviorSubject<number>(0);
  drawerCollapsed = this.userPrefsService.getDrawerSetting();
  drawerCollapsed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.drawerCollapsed);

  setHeaderTitle(title: string) {
    this.headerTitle.next(title);
  }

  getScrollPosition(n: number) {
    this.scrollPosition$.next(n);
    if (this.scrollPosition$.value >= 0) {
      this.headerOpacity$.next(n / 100);
    } else if (this.scrollPosition$.value < 200) {
      this.headerOpacity$.next(0);
    }
  }

  toggleDrawer() {
    this.drawerCollapsed$.next(this.drawerCollapsed = !this.drawerCollapsed);
    this.userPrefsService.toggleDrawer();
  }

  closeWindow() {
    this.electronService.getIpcRenderer().send("toMain", { command: 'closeWindow' });
  }

  minWindow() {
    this.electronService.getIpcRenderer().send("toMain", { command: 'minimizeWindow' });
  }

  maxWindow() {
    this.electronService.getIpcRenderer().send("toMain", { command: 'maximizeWindow' });
  }
}
