import { Injectable } from '@angular/core';
import { AppFacade } from '../../../store/facades/app.facade';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  listenForCookies() {
    (window as any).api.cookies((event: any, cookies: any) => {
      console.log((window as any).api.cookies);
      console.log('[appIPC] recv-cookies');
      for (const key of Object.keys(cookies)) {
        console.log(key, cookies[key]);
        localStorage.setItem(key, cookies[key]);
      }
    });
  }

  async checkForLogins() {
    return [true, true];
  }

  async loginAppleMusic() {
    (window as any).api.send('apple-music-login', 'apple-music-login');
  }

  async logoutAppleMusic() {
    console.log('logout');
  }

  async loginSpotify() {
    console.log('login');
  }

  async logoutSpotify() {
    console.log('logout');
  }
}
