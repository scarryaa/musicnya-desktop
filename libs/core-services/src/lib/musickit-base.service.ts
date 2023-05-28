import { Injectable } from '@angular/core';
import { HttpService } from '@nyan-inc/core';
import type { MusicKit as Music } from '../types';

declare const MusicKit: typeof Music;

@Injectable({
  providedIn: 'root',
})
export class MusickitBase {
  public instance!: Music.MusicKitInstance;

  constructor(private http: HttpService) {
    this.init();
  }

  async init(): Promise<void> {
    await this.http.getConfig().then((result) => {
      this.initMusicKit(result).then(async (result) => {
        this.instance = result;
        this.instance.volume = 0.05;
        this.instance.clearQueue();
        this.instance.stop();
      });
    });
  }

  /**
   * Initialize MusicKit
   * @param developmentToken - The development token
   */
  async initMusicKit(developmentToken: string) {
    this.instance = await MusicKit.configure({
      developerToken: developmentToken,
      app: {
        name: 'Apple Music',
        build: '1978.4.1',
        version: '1.0',
      },
      sourceType: 24,
      suppressErrorDialog: false,
    });
    return this.instance;
  }
}
