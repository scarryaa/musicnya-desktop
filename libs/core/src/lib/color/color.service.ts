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
    let regex1 = /(%[0-9A-Fa-f][0-9A-Fa-f]([A-Za-z]%[0-9A-Fa-f][0-9A-Fa-f])+)/i;
    return await this.fac.getColorAsync(image?.replace(regex1, '50x50').replace('{w}x{h}', '50x50').replace('{f}', 'webp'), {
      mode: 'speed',
      algorithm: 'dominant',
      ignoredColor: [
        [255, 255, 255, 255, 80],
        [20, 20, 20, 255, 20],
      ],
    });
  }
}
