import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ColorPickerModule } from 'src/app/modules/color-picker/color-picker.module';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ColorPickerComponent } from 'src/app/modules/color-picker/components/color-picker/color-picker.component';
import { A11yModule } from '@angular/cdk/a11y';
import { Subscription } from 'rxjs';
import { SettingsStore } from 'src/app/store/settings-store';
import { ColorPreset, Constants } from 'src/app/constants/constants';
import { ThemeStore } from 'src/app/store/theme-store';
import { rgbToHex } from 'src/app/helpers/helpers';
import { StyleService } from 'src/app/shared/services/style/style.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [MatIconModule, ColorPickerModule, CdkOverlayOrigin, CdkConnectedOverlay, MatButtonModule, MatExpansionModule, CommonModule, MatSlideToggleModule, A11yModule]
})

export class SettingsComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  tmpPrimaryColor!: string;
  tmpAccentColor!: string;
  primaryOpen = false;
  accentOpen = false;
  presetColorsOpen = false;
  colorPresets: any;

  constructor(public themeStore: ThemeStore, public settingsStore: SettingsStore, private styleService: StyleService) {
    var result = Object.entries<any>(Constants.colorPresets);
    result.forEach(element => element.push({ "selected": false }));
    this.colorPresets = [...result];
    this.tmpPrimaryColor = themeStore.state.primaryColor;
    this.tmpAccentColor = themeStore.state.accentColor;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  @ViewChild('primaryOverlay', { read: ElementRef, static: true }) primaryOverlay!: ElementRef;
  @ViewChild('colorPicker') colorPicker!: ColorPickerComponent;
  @ViewChild('secondaryColorPicker') secondaryColorPicker!: ColorPickerComponent;
  @ViewChild('primaryColor') primaryColor!: any;
  @ViewChild('primaryContainer') primaryContainer!: HTMLDivElement;
  @ViewChild('accentContainer') accentContainer!: HTMLDivElement;

  toggleColorPicker(picker: HTMLDivElement) {
    if (picker.classList.contains('primary')) {
      this.accentOpen = false;
      this.primaryOpen = !this.primaryOpen;
    } else if (picker.classList.contains('secondary')) {
      this.primaryOpen = false;
      this.accentOpen = !this.accentOpen;
    }

    if (this.primaryOpen || this.accentOpen) {
      if (document.documentElement.style.getPropertyValue('--enable-color-transition') !== '0s')
        document.documentElement.style.setProperty('--enable-color-transition', '0s');
    } else {
      if (document.documentElement.style.getPropertyValue('--enable-color-transition') !== 'color 0.35s, background-color 0.35s, border-color 0.35s')
        document.documentElement.style.setProperty('--enable-color-transition', 'color 0.35s, background-color 0.35s, border-color 0.35s');
    }
  }

  handleBlur(event: any) {
    if (!event.currentTarget.contains(event.relatedTarget) && (!event.relatedTarget || !event.relatedTarget.classList.contains('primary') &&
      (!event.relatedTarget || !event.relatedTarget.classList.contains('secondary')))) {
      if (this.primaryOpen) this.closeWithoutSavingPrimary();
      if (this.accentOpen) this.closeWithoutSavingAccent();
    }
  }

  handleChildBlur(event: any) {
    if (!event.relatedTarget || !event.relatedTarget.parentNode.contains(event.currentTarget)) {
      if (this.primaryOpen) this.closeWithoutSavingPrimary();
      if (this.accentOpen) this.closeWithoutSavingAccent();
    }
  }

  previewColorPrimary(color: string) {
    this.tmpPrimaryColor = rgbToHex(color);
    this.styleService.setTheme({primaryColor: this.tmpPrimaryColor});
  }

  previewColorAccent(color: string) {
    this.tmpAccentColor = rgbToHex(color); 
    this.styleService.setTheme({accentColor: this.tmpAccentColor});
  }

  closeWithoutSavingPrimary() {
    this.styleService.setTheme({primaryColor: this.themeStore.state.primaryColor});
    this.tmpPrimaryColor = this.themeStore.state.primaryColor;
    this.primaryOpen = false;
  }

  closeWithoutSavingAccent() {
    this.styleService.setTheme({accentColor: this.themeStore.state.accentColor});
    this.tmpAccentColor = this.themeStore.state.accentColor;
    this.accentOpen = false;
  }

  setPrimaryColor() {
    this.themeStore.setThemePair(this.tmpPrimaryColor, undefined);
    this.primaryOpen = false;
  }

  setAccentColor() {
    this.themeStore.setThemePair(undefined, this.tmpAccentColor);
    this.accentOpen = false;
  }

  setTheme(theme: ColorPreset) {
    this.themeStore.setThemePair(theme.primaryColor, theme.accentColor);
  }

  selectPreset(preset: any) {
    this.colorPresets.forEach((e: any) => {
      if (e[1] !== preset) {
        e[2].selected = false;
      }
    });
    preset[2].selected = !preset[2].selected;

    this.setTheme(preset[1]);
    this.tmpPrimaryColor = preset[1].primaryColor;
    this.tmpAccentColor = preset[1].accentColor;
  }
}