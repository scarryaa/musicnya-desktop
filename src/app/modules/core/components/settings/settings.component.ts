import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ColorPickerModule } from 'src/app/modules/color-picker/color-picker.module';
import { UserPrefsService } from 'src/app/shared/services/user-prefs/user-prefs.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { UtilityService } from 'src/app/shared/services/utility/utility.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ColorPickerComponent } from 'src/app/modules/color-picker/components/color-picker/color-picker.component';
import { A11yModule, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [MatIconModule, ColorPickerModule, CdkOverlayOrigin, CdkConnectedOverlay, MatButtonModule, MatExpansionModule, CommonModule, MatSlideToggleModule, A11yModule]
})

export class SettingsComponent implements OnInit {
  constructor(public userPrefsService: UserPrefsService, private utilityService: UtilityService, private themeService: ThemeService) { }
  primaryOpen = false;
  secondaryOpen = false;
  presetColorsOpen = false;
  clickSub: any;
  @ViewChild('primaryOverlay', { read: ElementRef, static: true }) primaryOverlay!: ElementRef;
  @ViewChild('colorPicker') colorPicker!: ColorPickerComponent;
  @ViewChild('secondaryColorPicker') secondaryColorPicker!: ColorPickerComponent;
  @ViewChild('primaryColor') primaryColor!: any;
  @ViewChild('primaryContainer') primaryContainer!: HTMLDivElement;
  @ViewChild('accentContainer') accentContainer!: HTMLDivElement;

  colorPresets: ColorPreset[] = [
    new ColorPreset(this.utilityService.hexToRgb('#4c4978')!, this.utilityService.hexToRgb('#ff4d9d')!, false),
    new ColorPreset(this.utilityService.hexToRgb('#418975')!, this.utilityService.hexToRgb('#ff7ca1')!, false),
    new ColorPreset(this.utilityService.hexToRgb('#772245')!, this.utilityService.hexToRgb('#ffa4c0')!, false),
    new ColorPreset(this.utilityService.hexToRgb('#006480')!, this.utilityService.hexToRgb('#b3e7ff')!, false),
    new ColorPreset(this.utilityService.hexToRgb('#6f8947')!, this.utilityService.hexToRgb('#dced7d')!, false),
    new ColorPreset(this.utilityService.hexToRgb('#e65825')!, this.utilityService.hexToRgb('#fed2c2')!, false),
    new ColorPreset(this.utilityService.hexToRgb('#c9a847')!, this.utilityService.hexToRgb('#fff2d9')!, false),
    new ColorPreset(this.utilityService.hexToRgb('#e65382')!, this.utilityService.hexToRgb('#ffe4ed')!, false),
    new ColorPreset(this.utilityService.hexToRgb('#5e1649')!, this.utilityService.hexToRgb('#ffd0e9')!, false),
    new ColorPreset(this.utilityService.hexToRgb('#df003f')!, this.utilityService.hexToRgb('#ffdada')!, false),
    new ColorPreset(this.utilityService.hexToRgb('#004844')!, this.utilityService.hexToRgb('#a8c4c0')!, false),
    new ColorPreset(this.utilityService.hexToRgb('#b18a82')!, this.utilityService.hexToRgb('#ffdad3')!, false),
    new ColorPreset(this.utilityService.hexToRgb('#0086e7')!, this.utilityService.hexToRgb('#beddff')!, false),
    new ColorPreset(this.utilityService.hexToRgb('#7d4993')!, this.utilityService.hexToRgb('#f7d4ff')!, false),
    new ColorPreset(this.utilityService.hexToRgb('#00324a')!, this.utilityService.hexToRgb('#d4e7ff')!, false),
  ];
  selected = false;

  ngOnInit(): void {
    this.clickSub = this.utilityService.documentClickedTarget
      .subscribe(target => this.documentClickListener(target));
  }
  userPrimaryColor: string = this.userPrefsService.getUserPrimaryColor();
  userSecondaryColor: string = this.userPrefsService.getUserAccentColor();
  darkTheme: boolean = this.userPrefsService.getDarkTheme();

  toggleColorPicker(picker: HTMLDivElement) {
    if (picker.classList.contains('primary')) {
      this.secondaryOpen = false;
      this.primaryOpen = !this.primaryOpen;
    } else if (picker.classList.contains('secondary')) {
      this.primaryOpen = false;
      this.secondaryOpen = !this.secondaryOpen;
    }

    if (this.primaryOpen || this.secondaryOpen) {
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
      if (this.secondaryOpen) this.closeWithoutSavingAccent();
    }
  }

  handleChildBlur(event: any) {
    if (!event.relatedTarget || !event.relatedTarget.parentNode.contains(event.currentTarget)) {
      if (this.primaryOpen) this.closeWithoutSavingPrimary();
      if (this.secondaryOpen) this.closeWithoutSavingAccent();
    }
  }

  documentClickListener(target: Element): void {

  }

  setPrimaryColor(color: string) {
    if (!color) return;
    var strippedVals: string = this.utilityService.stripRgb(color);
    document.documentElement.style.setProperty('--primaryColor', strippedVals);
    var luma = this.themeService.calculateColorBrightness(this.utilityService.rgbToHex(color));
    if (luma > 180) document.documentElement.style.setProperty('--override-color', 'rgb(40, 40, 40)');
    else document.documentElement.style.setProperty('--override-color', '');
  }

  setSecondaryColor(color: string) {
    if (!color) return;
    var strippedVals: string = this.utilityService.stripRgb(color);
    document.documentElement.style.setProperty('--accentColor', strippedVals);
  }

  saveUserPrimaryColor(color: string = this.colorPicker.color) {
    this.userPrimaryColor = color;
    this.userPrefsService.setUserPrimaryColor(color);
    this.primaryOpen = false;
  }

  saveUserAccentColor(color: string = this.secondaryColorPicker.color) {
    this.userSecondaryColor = color;
    this.userPrefsService.setUserSecondaryColor(color);
    this.secondaryOpen = false;
  }

  closeWithoutSavingPrimary() {
    this.setPrimaryColor(this.userPrimaryColor);
    this.primaryOpen = false;
  }

  closeWithoutSavingAccent() {
    this.setSecondaryColor(this.userSecondaryColor);
    this.secondaryOpen = false;
  }

  selectPreset(preset: ColorPreset) {
    this.colorPresets.forEach(colorPreset => {
      if (colorPreset !== preset) {
        colorPreset.selected = false;
      }
    });

    preset.selected = !preset.selected;
    this.saveUserPrimaryColor(preset.primaryColor);
    this.setPrimaryColor(preset.primaryColor);
    this.saveUserAccentColor(preset.secondaryColor);
    this.setSecondaryColor(preset.secondaryColor);
  }
}

class ColorPreset {
  primaryColor: string;
  secondaryColor: string;
  selected: boolean = false;

  constructor(primaryColor: string, secondaryColor: string, selected: boolean) {
    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;
    this.selected = selected;
  }
}