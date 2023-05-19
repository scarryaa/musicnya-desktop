import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MusickitAPIService {
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
    return this.instance;
  }

  async setQueue(object: MusicKit.QueueOptions) {
    return await this.instance
      .setQueue({ ...object })
      .then(() => object.startPlaying);
  }

  async play() {
    return await this.instance.play();
  }
}
