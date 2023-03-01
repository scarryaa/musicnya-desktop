import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { Preferences } from 'src/app/modules/core/models/preferences';
import { ElectronService } from '../electron/electron.service';
import { CurrentPlatform } from '../ui/current-platform';
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
      var prefs: Preferences = res.data.data;
      var strippedPrimary: string = this.utilityService.stripRgb(prefs.userPrimaryColor);
      var strippedAccent: string = this.utilityService.stripRgb(prefs.userAccentColor);
      document.documentElement.style.setProperty('--primaryColor', strippedPrimary);
      document.documentElement.style.setProperty('--accentColor', strippedAccent);
      this.colorChanged$.next([strippedPrimary, strippedAccent]);
      this.darkTheme = prefs.darkTheme;
      !this.darkTheme ? document.documentElement.classList.add("use-light-theme") : document.documentElement.classList.remove("use-light-theme");
      this.darkTheme$.next(this.darkTheme);
      return this.userPrefs = prefs;
    });
    this.electronService.getIpcRenderer().send("toMain", { command: 'getUserPrefs' });
  }

  private drawerCollapsed = false;
  private currentPlatform: CurrentPlatform = CurrentPlatform.Win;
  private defaultPrimaryColor: string = '90, 87, 142';
  private defaultAccentColor: string = '255, 64, 128';
  private currentPrimaryColor!: string;
  private currentAccentColor!: string;
  private darkTheme: boolean = true;
  public darkTheme$ = new BehaviorSubject<boolean>(this.darkTheme);
  public colorChanged$ = new BehaviorSubject<[string, string]>([this.currentPrimaryColor, this.currentAccentColor]);
  private userPrefs: Preferences = new Preferences(this.defaultPrimaryColor, this.defaultAccentColor, this.drawerCollapsed, this.darkTheme);

  toggleDrawer(): void {
    this.drawerCollapsed = !this.drawerCollapsed;
    this.userPrefs.drawerCollapsed = !this.userPrefs.drawerCollapsed;
    this.saveUserPrefs();
  }

  toggleDarkTheme() {
    this.darkTheme = !this.darkTheme;
    this.userPrefs.darkTheme = !this.userPrefs.darkTheme;
    !this.darkTheme ? document.documentElement.classList.add("use-light-theme") : document.documentElement.classList.remove("use-light-theme");
    this.darkTheme$.next(this.darkTheme);
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
    return this.userPrefs.drawerCollapsed ?? this.drawerCollapsed;
  }

  getUserPrimaryColor() {
    return (this.userPrefs.userPrimaryColor ?? this.defaultPrimaryColor);
  }

  getUserAccentColor() {
    return this.userPrefs.userAccentColor ?? this.defaultAccentColor;
  }

  getDarkTheme() {
    return this.userPrefs.darkTheme;
  }
}
