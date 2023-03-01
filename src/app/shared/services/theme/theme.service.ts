import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserPrefsService } from '../user-prefs/user-prefs.service';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(private userPrefsService: UserPrefsService, private utilityService: UtilityService) {
    this.userPrefsService.colorChanged$.subscribe((res: [string, string]) => { this.currentPrimary = res[0]; this.currentAccent = res[1]; })
    this.userPrefsService.darkTheme$.subscribe((res: boolean) => this.darkTheme = res);
  }

  playlistHeaderColor$ = new Subject<string>();
  currentPrimary: string = this.userPrefsService.getUserPrimaryColor() ?? 'rgb(90, 87, 142)';
  currentAccent: string = this.userPrefsService.getUserAccentColor() ?? 'rgb(255, 64, 128)';
  primaryPageColor: string = this.currentPrimary;
  darkTheme: boolean = this.userPrefsService.getDarkTheme();
  headerColor: string = this.darkTheme ? '20, 20, 20' : '250, 250, 250';

  resetColorHeader() {
    this.headerColor = this.darkTheme ? '20, 20, 20' : '250, 250, 250';
  }

  getPrimaryPageColor() {
    return this.primaryPageColor;
  }

  lightenColor(color: string, factor: number = 1): string {
    var splitValues: string[] = this.utilityService.stripRgb(color).split(',');
    splitValues.forEach((elem: string, index: number) => {
      splitValues[index] = `${Math.min(parseInt(elem) + (20 * factor), 255)}`;
    });
    return `${splitValues[0]}, ${splitValues[1]}, ${splitValues[2]}`;
  }

  darkenColor(color: string, factor: number = 1): string {
    var splitValues: string[] = this.utilityService.stripRgb(color).split(',');
    splitValues.forEach((elem: string, index: number) => {
      splitValues[index] = `${Math.min((parseInt(elem) - (20 * factor)), 255)}`;
    });
    return `${splitValues[0]}, ${splitValues[1]}, ${splitValues[2]}`;
  }

  calculateColorBrightness(color: string) {
    color = color.substring(1);
    var rgb = parseInt(color, 16);
    var r = (rgb >> 16) & 0xff;
    var g = (rgb >>  8) & 0xff;
    var b = (rgb >>  0) & 0xff;

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // ITU-R BT.709
    return luma;
  }
}