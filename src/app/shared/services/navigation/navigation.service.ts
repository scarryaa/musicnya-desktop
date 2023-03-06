import { Location } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, Subscription } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { hexToRgb } from 'src/app/helpers/helpers';
import { ThemeStore } from 'src/app/store/theme-store';
import { UIState, UIStore } from 'src/app/store/ui-store';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnDestroy {
  subs: Subscription = new Subscription();
  navEvents: string[] = [];
  currentNavIndex: number = 1;
  backButtonEnabled: boolean = false;
  forwardButtonEnabled: boolean = false;

  constructor(public router: Router, private uiStore: UIStore, private themeStore: ThemeStore, private _location: Location) {
    this.subs.add(this.uiStore.state$.pipe(
      map((state: UIState) => state.backButtonEnabled),
      distinctUntilChanged())
      .subscribe(backButtonEnabled => this.backButtonEnabled = backButtonEnabled));

    this.subs.add(this.uiStore.state$.pipe(
      map((state: UIState) => state.forwardButtonEnabled),
      distinctUntilChanged())
      .subscribe(forwardButtonEnabled => this.forwardButtonEnabled = forwardButtonEnabled));

    this.subs.add(this.router.events.pipe(filter((event: Event):
      event is NavigationStart => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => this.handleNavEventStart(event))
    );

    this.subs.add(this.router.events.pipe(filter((event: Event):
      event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this.handleNavEventEnd(event))
    );
  };

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  handleNavEventStart(event: NavigationStart) {
    if (event.navigationTrigger != 'popstate' && (event.url != this.navEvents[this.currentNavIndex] || this.navEvents[this.currentNavIndex] == undefined)) {
      //handle going to a new page when not at top of nav history stack
      if (this.navEvents[this.currentNavIndex + 1] != null) {
        this.navEvents = this.navEvents.slice(0, this.currentNavIndex + 1);
      }
      this.navEvents.push(event.url);
      this.currentNavIndex = this.navEvents.length - 1;
    }
    this.shouldDisableNav();
  }

  handleNavEventEnd(event: NavigationEnd) {
    if (!this.router.url.includes('playlist')) this.themeStore.setHeaderColor(
      this.themeStore.state.darkTheme ? hexToRgb(Constants.headerColorDark, true)! : hexToRgb(Constants.headerColor, true)!);
  }

  shouldDisableNav() {
    this.uiStore.setBackButtonEnabled(this.currentNavIndex > 0);
    this.uiStore.setForwardButtonEnabled(this.currentNavIndex + 1 !== this.navEvents.length)
  }

  prevPage() {
    if (this.backButtonEnabled) {
      this._location.back();
      this.currentNavIndex--;
    }
  }

  nextPage() {
    if (this.forwardButtonEnabled) {
      this._location.forward();
      this.currentNavIndex++;
    }
  }
}
