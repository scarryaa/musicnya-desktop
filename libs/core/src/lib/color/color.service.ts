import { Injectable } from '@angular/core';
import {
  FastAverageColor,
  FastAverageColorResult,
  FastAverageColorIgnoredColor,
} from 'fast-average-color';
import { adjustColor } from '../utils/musickit-mappings';

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
        [255, 255, 255, 255, 80],
        [20, 20, 20, 255, 20],
      ],
    });
  }
}
