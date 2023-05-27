import { Injectable, OnInit } from '@angular/core';
import { HttpService } from '@nyan-inc/core';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root',
})
export class MusickitBase implements OnInit {
  public instance!: typeof MusicKit.MusicKitInstance;

  constructor(private http: HttpService) {
    this.init();
  }

  async init(): Promise<void> {
    await this.http.getConfig().then((res) => {
      const DEV_TOKEN = this.http.DEV_TOKEN;
      this.initMusicKit(DEV_TOKEN);
    });
  }

  async ngOnInit(): Promise<void> {
    await this.http.getConfig();
    const DEV_TOKEN = this.http.DEV_TOKEN;

    this.initMusicKit(DEV_TOKEN);
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
