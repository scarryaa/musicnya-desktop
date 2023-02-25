import { AfterViewInit, ChangeDetectorRef, Component, Input, Renderer2, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Location } from "@angular/common";
import { ColorFadeService } from 'src/app/shared/services/color-fade/color-fade.service';
import { MatToolbar } from '@angular/material/toolbar';
import { ElectronService } from 'src/app/shared/services/electron/electron.service';
import { UserPrefsService } from '../../services/user-prefs/user-prefs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('header') headerElem!: MatToolbar;
  @ViewChild('playlistControls') playlistControls!: any;

  compact: boolean = false;
  navEvents: string[] = [];
  headerOpacity: number = 0;
  disableBackBtn: boolean = true;
  disableForwardBtn: boolean = true;
  firstPage: boolean = true;
  backButton: boolean = false;
  currentNavIndex: number = 1;
  playlistTitle: string = '';

  //TODO implement back navigation within library filters page
  constructor(public router: Router, private _location: Location, private colorFadeService: ColorFadeService, private renderer: Renderer2, 
    private ref: ChangeDetectorRef, private electronService: ElectronService, private userPrefsService: UserPrefsService) {
    router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        if (e.navigationTrigger != 'popstate' && (e.url != this.navEvents[this.currentNavIndex] || this.navEvents[this.currentNavIndex] == undefined)) {
          //handle going to a new page when not at top of nav history stack
          if (this.navEvents[this.currentNavIndex + 1] != null) {
            this.navEvents = this.navEvents.slice(0, this.currentNavIndex + 1);
          }
          this.navEvents.push(e.url);
          this.currentNavIndex = this.navEvents.length - 1;
        }
        this.shouldDisableNav();
      }
    });
  }

  closeWindow() {
    this.electronService.getIpcRenderer().send("toMain", {command: 'closeWindow'});
  }

  minWindow() {
    this.electronService.getIpcRenderer().send("toMain", {command: 'minimizeWindow'});
  }

  maxWindow() {
    this.electronService.getIpcRenderer().send("toMain", {command: 'maximizeWindow'});
  }

  toggleSideNav() {
    this.userPrefsService.toggleDrawer();
    this.compact = !this.compact;
  }

  ngAfterViewInit(): void {
    this.colorFadeService.playlistTitle$.subscribe((title: string) => {
        this.playlistTitle = title;
        this.ref.detectChanges();
    });

    this.colorFadeService.myFunctionCalled$.subscribe((values: [number, string]) => {
      this.headerOpacity = values[0];
      this.ref.detectChanges();

      this.renderer.setStyle(this.headerElem._elementRef.nativeElement,
      'backgroundColor', `rgba(${this.darkenColor(values[1])}, ${values[0]}`)
    });
  }

  darkenColor(color: string): string {
    var splitValues: string[] = color.replace('rgb(', '').replace(')', '').split(',');
    splitValues.forEach((elem: string, index: number) => {
      splitValues[index] = `${parseInt(elem) - 20}`;
    });
    return `${splitValues[0]}, ${splitValues[1]}, ${splitValues[2]}`;
  }

  shouldDisableNav() {
    if (this.currentNavIndex <= 0) this.disableBackBtn = true;
    else this.disableBackBtn = false;

    if (this.currentNavIndex + 1 == this.navEvents.length) this.disableForwardBtn = true;
    else this.disableForwardBtn = false;
  }

  prevPage() {
    if (this.disableBackBtn != true) {
      this._location.back();
      this.currentNavIndex--;
    }
  }

  nextPage() {
    if (this.disableForwardBtn != true) {
      this._location.forward();
      this.currentNavIndex++;
    }
  }

  @Input() searchInput: string = '';
}