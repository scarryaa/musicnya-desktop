import { Injectable } from '@angular/core';
import { HttpService } from '@nyan-inc/core';
import { MusicKit } from '../types/musickit';
import { MusickitBase } from './musickit-base.service';

@Injectable({
  providedIn: 'root',
})
export class Musickit {
  _instance!: MusicKit.MusicKitInstance;

  constructor(private musicKitBase: MusickitBase, private http: HttpService) {
    this.getInstance(http.DEV_TOKEN);
  }

  async getInstance(developmentToken: string) {
    this._instance = this.musicKitBase.instance as MusicKit.MusicKitInstance;
  }

  async play() {
    return await this.instance.setQueue({ album: '1586653480' }).then(() => {
      return this.instance.changeToMediaAtIndex(0);
    });
  }

  async pause() {
    return this.instance.pause();
  }

  async stop() {
    return await this.instance.stop();
  }

  async setQueueFromMediaItems(object: MusicKit.MediaItem[]) {
    return await this.instance.setQueue({ items: object });
  }

  async skipToNextItem() {
    return await this.instance.skipToNextItem();
  }

  async skipToPreviousItem() {
    return await this.instance.skipToPreviousItem();
  }

  async changeToMediaAtIndex(index: number) {
    return await this.instance.changeToMediaAtIndex(index);
  }

  async seekToTime(time: number) {
    return await this.instance.seekToTime(time);
  }

  async setQueueFromSongIDs(songIds: string[]) {
    return await this.instance.setQueue({ songs: songIds });
  }

  setQueue = async (options: MusicKit.QueueOptions) => {
    return await this.instance.setQueue({ ...options });
  };

  async setVolume(volume: number) {
    return (this.instance.volume = volume);
  }

  /**
   * Get the instance
   */

  public get instance(): MusicKit.MusicKitInstance {
    return this.musicKitBase.instance as MusicKit.MusicKitInstance;
  }

  public set instance(instance: MusicKit.MusicKitInstance) {
    this._instance = instance as MusicKit.MusicKitInstance;
  }
}
