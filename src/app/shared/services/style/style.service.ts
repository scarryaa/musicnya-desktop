import { Injectable, OnDestroy } from '@angular/core';
import { distinctUntilChanged, map, Subscription } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { calculateColorBrightness, darkenColor, doneWithInit, hexToRgb } from 'src/app/helpers/helpers';
import { ThemeState, ThemeStore } from 'src/app/store/theme-store';

enum DOMProperty {
  lightTheme = "light-theme",
  primaryColor = "--primary-color",
  primaryColorDark = "--primary-color-dark",
  accentColor = "--accent-color",
  overrideColor = "--override-color"
}

@Injectable({
  providedIn: 'root'
})
export class StyleService implements OnDestroy {
  subs: Subscription;

  constructor(private themeStore: ThemeStore) {
    this.subs = new Subscription();

    this.subs.add(this.themeStore.state$.pipe(map((state: ThemeState) =>
      ({ primaryColor: state.primaryColor, accentColor: state.accentColor })),
      distinctUntilChanged()).subscribe((theme: Object) => {
        if (doneWithInit()) this.setTheme(theme);
      }));

    this.subs.add(this.themeStore.state$.pipe(map((state: ThemeState) => state.darkTheme),
      distinctUntilChanged()).subscribe((darkTheme: boolean) => {
        if (doneWithInit()) this.setDarkTheme(darkTheme);
      }
      ));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setTheme(colorPair: Partial<ThemeState>) {
    if (colorPair.primaryColor) this.setDOMStyle(DOMProperty.primaryColor, hexToRgb(colorPair.primaryColor, true)!);
    if (colorPair.primaryColor) this.setDOMStyle(DOMProperty.primaryColorDark, darkenColor(hexToRgb(colorPair.primaryColor, true)!, 0.5));
    if (colorPair.accentColor) this.setDOMStyle(DOMProperty.accentColor, hexToRgb(colorPair.accentColor, true)!);
  }
  
  applyThemeColorOverride(primaryColor: string) {
    var luma = calculateColorBrightness(hexToRgb(primaryColor, true)!);
    if (luma > 180) {
      this.setDOMStyle(DOMProperty.overrideColor, Constants.darkThemeOverride);
      this.themeStore.setOverrideColor(Constants.darkThemeOverride);
    } else {
      this.setDOMStyle(DOMProperty.overrideColor);
      this.themeStore.setOverrideColor(Constants.white);
    }
  }

  setDarkTheme(enabled: boolean) {
    enabled ? this.removeClassFromDOM(DOMProperty.lightTheme) : this.addClassToDOM(DOMProperty.lightTheme);
  }

  setDOMStyle(property: string, value?: string) {
    document.documentElement.style.setProperty(property, value ?? null);
  }

  addClassToDOM(domClass: DOMProperty) {
    document.documentElement.classList.add(domClass);
  }

  removeClassFromDOM(domClass: DOMProperty) {
    document.documentElement.classList.remove(domClass);
  }
}
