import { Location } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UIService } from '../ui/ui.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(public router: Router, private uiService: UIService, private _location: Location) {
    this.router.events.subscribe(e => {
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

  navEvents: string[] = [];
  currentNavIndex: number = 1;

  shouldDisableNav() {
    if (this.currentNavIndex <= 0) this.uiService.backButtonEnabled = false;
    else this.uiService.backButtonEnabled = true;

    if (this.currentNavIndex + 1 == this.navEvents.length) this.uiService.forwardButtonEnabled = false
    else this.uiService.forwardButtonEnabled = true;
  }

  prevPage() {
    if (this.uiService.backButtonEnabled) {
      this._location.back();
      this.currentNavIndex--;
    }
  }

  nextPage() {
    if (this.uiService.forwardButtonEnabled) {
      this._location.forward();
      this.currentNavIndex++;
    }
  }
}
