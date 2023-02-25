import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ColorPickerModule } from 'src/app/modules/color-picker/color-picker.module';
import { UserPrefsService } from 'src/app/shared/services/user-prefs/user-prefs.service';
import { CommonModule } from '@angular/common';
import { UtilitiesService } from 'src/app/app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [MatIconModule, ColorPickerModule, CdkOverlayOrigin, CdkConnectedOverlay, MatButtonModule, MatExpansionModule, CommonModule]
})

export class SettingsComponent implements OnInit {
  constructor(private userPrefsService: UserPrefsService, private utilitiesService: UtilitiesService) {}
  primaryOpen = false;
  secondaryOpen = false;
  presetColorsOpen = false;
  clickSub: any;
  tmpPrimaryColor: string = this.userPrefsService.getUserPrimaryColor();
  tmpSecondaryColor: string = this.userPrefsService.getUserSecondaryColor();
  @ViewChild('primaryOverlay', { read: ElementRef, static: true }) primaryOverlay!: ElementRef;
  @ViewChild('colorPicker') colorPicker!: any;
  @ViewChild('secondaryColorPicker') secondaryColorPicker!: any;
  @ViewChild('primaryColor') primaryColor!: any;
  colorPresets: ColorPreset[] = [
    new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false),
    new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false),
    new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false),
    new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false),
    new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false), new ColorPreset('black', 'red', false)
  ];
  selected = false;
  
  ngOnInit(): void {
    this.clickSub = this.utilitiesService.documentClickedTarget
      .subscribe(target => this.documentClickListener(target));
    
    console.log(this.userPrefsService.getUserPrimaryColor().subscribe((res: any) => console.log(res)));
    console.log(this.userPrefsService.getUserSecondaryColor().subscribe((res: any) => console.log(res)));
  }

  userPrimaryColor: string = '#DDDDDD';
  userSecondaryColor: string = '#DDDDDD';

  documentClickListener(target: any): void {
    if (!this.primaryOpen && (target.className.includes('color-wheel'))) {
      this.primaryOpen = true; return;
    }

    if (this.colorPicker && this.primaryOpen && !this.primaryOverlay.nativeElement.contains(target)) {
      console.log(target);
      console.log(this.primaryOverlay.nativeElement)
      this.primaryOpen = false;
    }

    if (this.secondaryColorPicker && this.secondaryOpen && !this.secondaryColorPicker.nativeElement.contains(target)) {
      this.secondaryOpen = false;
    }
  }

  setUserPrimaryColor() {
    this.userPrimaryColor = this.colorPicker.color;
    this.userPrefsService.setUserPrimaryColor(this.colorPicker.color);
    this.primaryOpen = false;
  }

  setUserSecondaryColor() {
    this.userSecondaryColor = this.secondaryColorPicker.color;
    this.userPrefsService.setUserSecondaryColor(this.secondaryColorPicker.color);
    this.secondaryOpen = false;
  }

  selectPreset(preset: ColorPreset) {
    this.colorPresets.forEach(colorPreset => {
      if (colorPreset !== preset) {
        colorPreset.selected = false;
      }
    });

    preset.selected = !preset.selected;
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