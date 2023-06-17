import { Injectable } from '@angular/core';
import type { MusicKit as Music } from '@nyan-inc/shared-types';
import { HttpService } from './http/http.service';

declare const MusicKit: any;

@Injectable({
  providedIn: 'root',
})
export class MusickitBase {
  public instance!: Music.MusicKitInstance;

  constructor(private http: HttpService) {}

  async init(): Promise<void> {
    return await this.http.getConfig().then((result) => {
      this.initMusicKit(result).then(async (instance) => {
        this.instance = instance;
        instance.volume = 0.05;
        instance.clearQueue();
        instance.stop();
        await instance.authorize();

        return instance;
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
