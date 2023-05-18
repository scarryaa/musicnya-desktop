import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MusickitAPIService {
  constructor() {}

  instance!: MusicKit.MusicKitInstance;

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
  }
}
