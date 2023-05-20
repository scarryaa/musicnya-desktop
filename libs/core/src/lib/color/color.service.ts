import { Injectable } from '@angular/core';
import {
  FastAverageColor,
  FastAverageColorResult,
  FastAverageColorIgnoredColor,
} from 'fast-average-color';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  fac: FastAverageColor;

  constructor() {
    this.fac = new FastAverageColor();
  }

  async getAverageColor(image: string): Promise<FastAverageColorResult | void> {
    return await this.fac.getColorAsync(image, {
      mode: 'speed',
      algorithm: 'dominant',
      ignoredColor: [
        [255, 255, 255, 255],
        [0, 0, 0, 255],
      ],
    });
  }
}
