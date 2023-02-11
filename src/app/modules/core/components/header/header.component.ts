import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Location } from "@angular/common";
import { filter } from 'rxjs';
import { Event } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navEvents: string[] = [];
  disableBackBtn: boolean = true;
  disableForwardBtn: boolean = true;
  firstPage: boolean = true;
  backButton: boolean = false;
  currentNavIndex: number = 1;

  //TODO implement back navigation within library filters page
  constructor(public router: Router, private _location: Location) { 
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