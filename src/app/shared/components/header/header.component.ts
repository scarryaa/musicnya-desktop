import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Location } from "@angular/common";
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { MatToolbar } from '@angular/material/toolbar';
import { ElectronService } from 'src/app/shared/services/electron/electron.service';
import { UserPrefsService } from '../../services/user-prefs/user-prefs.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { UIService } from '../../services/ui/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnInit {
  @ViewChild('header') headerElem!: MatToolbar;
  @ViewChild('playlistControls') playlistControls!: any;

  compact: boolean = this.uiService.drawerCollapsed;
  navEvents: string[] = [];
  headerOpacity: number = 0;
  disableBackBtn: boolean = true;
  disableForwardBtn: boolean = true;
  firstPage: boolean = true;
  backButton: boolean = false;
  currentNavIndex: number = 1;
  headerTitle: string = '';
  enableWindowControls: boolean = true;
  headerHeight: number = 45;

  ngOnInit(): void {
    this.enableWindowControls = environment.enableWindowControls;
  }

  //TODO implement back navigation within library filters page
  constructor(public router: Router, private _location: Location, public themeService: ThemeService, private renderer: Renderer2,
    private ref: ChangeDetectorRef, public uiService: UIService) {
    this.uiService.drawerCollapsed$.subscribe((value: boolean) => this.compact = value);
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

  toggleSideNav() {
    this.uiService.toggleDrawer();
  }

  ngAfterViewInit(): void {
    this.uiService.headerTitle$.subscribe((title: string) => {
      this.headerTitle = title;
      this.ref.detectChanges();
    });

    this.uiService.headerOpacity$.subscribe((opacity: number) => {
      this.renderer.setStyle(this.headerElem._elementRef.nativeElement,
        'backgroundColor', `rgba(${this.themeService.headerColor}, ${opacity}`);
        this.headerOpacity = opacity;
      this.ref.detectChanges();
    });
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