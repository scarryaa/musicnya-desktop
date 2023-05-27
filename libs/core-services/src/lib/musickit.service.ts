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
    this._instance = await this.musicKitBase.initMusicKit(developmentToken);
  }
}
