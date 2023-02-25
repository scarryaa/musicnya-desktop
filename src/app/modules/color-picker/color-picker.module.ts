import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ColorSliderComponent } from './components/color-picker/color-sliider/color-slider.component';
import { ColorPaletteComponent } from './components/color-picker/color-palette/color-palette.component';

@NgModule({
  declarations: [
    ColorPickerComponent,
    ColorSliderComponent,
    ColorPaletteComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ColorPickerComponent
  ]
})
export class ColorPickerModule {}
