import { Injectable } from '@angular/core';

export enum StorageKeys {
  MusicnyaPrefs = "musicnya-prefs"
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: StorageKeys, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: StorageKeys): string | null {
    return localStorage.getItem(key);
  }
}
