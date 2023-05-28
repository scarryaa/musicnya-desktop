import { Inject, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '@nyan-inc/core';
import { MusicEventListeners, MusicState } from '@nyan-inc/shared';
import type { MusicKit as Music } from '../types';

declare var MusicKit: typeof Music;

@Injectable({
  providedIn: 'root',
})
export class MusickitBase {
  public instance!: Music.MusicKitInstance;

  constructor(private http: HttpService, private store: Store<MusicState>) {
    this.init();
  }

  async init(): Promise<void> {
    await this.http
      .getConfig()
      .then((res) => {
        this.initMusicKit(res).then(async (res) => {
          this.instance = res;
          this.instance.volume = 0.05;
          this.instance.clearQueue();
          this.instance.stop();
          const eventListeners = new MusicEventListeners(this, this.store);
          eventListeners.addEventListeners();
        });
      })
      .finally(() => {});
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
