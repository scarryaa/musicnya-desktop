import { Injectable } from '@angular/core';
import { HttpService } from '@nyan-inc/core';
import { MusicEventListeners } from '@nyan-inc/shared';
import type { MusicKit as Music } from '../types';

declare const MusicKit: typeof Music;

@Injectable({
  providedIn: 'root',
})
export class MusickitBase {
  public instance!: Music.MusicKitInstance;

  constructor(
    private http: HttpService,
    private eventListener: MusicEventListeners
  ) {}

  async init(): Promise<void> {
    return await this.http.getConfig().then((result) => {
      this.initMusicKit(result).then(async (instance) => {
        this.instance = instance;
        instance.volume = 0.05;
        instance.clearQueue();
        instance.stop();

        this.eventListener.addEventListeners(instance);
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
