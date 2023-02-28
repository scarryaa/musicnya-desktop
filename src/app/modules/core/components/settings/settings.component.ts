import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ColorPickerModule } from 'src/app/modules/color-picker/color-picker.module';
import { UserPrefsService } from 'src/app/shared/services/user-prefs/user-prefs.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { UtilityService } from 'src/app/shared/services/utility/utility.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [MatIconModule, ColorPickerModule, CdkOverlayOrigin, CdkConnectedOverlay, MatButtonModule, MatExpansionModule, CommonModule]
})

export class SettingsComponent implements OnInit {
  constructor(public userPrefsService: UserPrefsService, private utilityService: UtilityService, private themeService: ThemeService) { }
  primaryOpen = false;
  secondaryOpen = false;
  presetColorsOpen = false;
  clickSub: any;
  @ViewChild('primaryOverlay', { read: ElementRef, static: true }) primaryOverlay!: ElementRef;
  @ViewChild('colorPicker') colorPicker!: any;
  @ViewChild('secondaryColorPicker') secondaryColorPicker!: any;
  @ViewChild('primaryColor') primaryColor!: any;
  colorPresets: ColorPreset[] = [
    new ColorPreset('rgb(90, 87, 142)', 'rgb(255, 64, 128)', false), new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false),
    new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false),
    new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false),
    new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false),
    new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false)
  ];
  selected = false;

  ngOnInit(): void {
    this.clickSub = this.utilityService.documentClickedTarget
      .subscribe(target => this.documentClickListener(target));
  }

  userPrimaryColor: string = this.userPrefsService.getUserPrimaryColor();
  userSecondaryColor: string = this.userPrefsService.getUserAccentColor();

  documentClickListener(target: any): void {
    if (!this.primaryOpen && (target.className.includes('color-wheel primary'))) {
      this.primaryOpen = true;
    } else if (!this.secondaryOpen && (target.className.includes('color-wheel secondary'))) {
      this.secondaryOpen = true;
    }
  }

  setPrimaryColor(color: string) {
    if (!color) return;
    var strippedVals: string = this.utilityService.stripRgb(color);
    document.documentElement.style.setProperty('--primaryColor', strippedVals);
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
    console.log(this.userSecondaryColor);
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