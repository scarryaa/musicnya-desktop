import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { ElectronService } from '../electron/electron.service';
import { CurrentPlatform } from '../ui/current-platform';
import { UIService } from '../ui/ui.service';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class UserPrefsService {
  constructor(private electronService: ElectronService, private utilityService: UtilityService) { }

  loadUserPrefs() {
    var platform$ = new Observable<any>((observer: Subscriber<any>) =>
      this.electronService.getIpcRenderer().receive('fromMain', (arg: any, event: any) => { if (arg.command == 'getUserPrefs') observer.next(arg) }));

    platform$.subscribe((res: any) => {
      var strippedPrimary: string = this.utilityService.stripRgb(res.data.data.userPrimaryColor);
      var strippedAccent: string = this.utilityService.stripRgb(res.data.data.userAccentColor);
      document.documentElement.style.setProperty('--primaryColor', strippedPrimary);
      document.documentElement.style.setProperty('--accentColor', strippedAccent);
      this.colorChanged$.next([strippedPrimary, strippedAccent]);
      return this.userPrefs = res.data.data;
    });
    this.electronService.getIpcRenderer().send("toMain", { command: 'getUserPrefs' });
  }

  private userPrefs!: any;
  private drawerCollapsed = false;
  private currentPlatform: CurrentPlatform = CurrentPlatform.Win;
  private currentPrimaryColor: string = '';
  private currentAccentColor: string = '';

  public colorChanged$ = new BehaviorSubject<[string, string]>([this.currentPrimaryColor, this.currentAccentColor]);

  toggleDrawer(): void {
    this.drawerCollapsed = !this.drawerCollapsed;
    this.userPrefs.drawerCollapsed = !this.userPrefs.drawerCollapsed;
    this.saveUserPrefs();
  }

  setPlatform(platform: CurrentPlatform): void {
    this.currentPlatform = platform;
  }

  getCurrentPlatform(): CurrentPlatform {
    return this.currentPlatform;
  }

  convertStringToPlatform(s: string) {
    switch (s) {
      case 'win32': return CurrentPlatform.Win;
      case 'darwin': return CurrentPlatform.Mac;
      case 'linux': return CurrentPlatform.Linux;
      default: return CurrentPlatform.Other;
    }
  }

  saveUserPrefs() {
    this.electronService.getIpcRenderer().send("toMain", { command: 'saveUserPrefs', data: this.userPrefs });
  }

  setUserPrimaryColor(color: string): void {
    this.userPrefs.userPrimaryColor = color;
    this.currentPrimaryColor = color;
    this.saveUserPrefs();
  }

  setUserSecondaryColor(color: string): void {
    this.userPrefs.userAccentColor = color;
    this.currentAccentColor = color;
    this.saveUserPrefs();
  }

  getDrawerSetting() {
    return this.userPrefs.drawerCollapsed;
  }

  getUserPrimaryColor() {
    return this.userPrefs.userPrimaryColor;
  }

  getUserAccentColor() {
    return this.userPrefs.userAccentColor;
  }

  //TODO: create data object
}
