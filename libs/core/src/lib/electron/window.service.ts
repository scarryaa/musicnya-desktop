import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowRefService {
  isElectron(): boolean {
    return (!!window?.process as any).browser;
  }

  getWindow(): any {
    return window;
  }
  constructor() {}
  get nativeWindow(): Window {
    return this.getWindow();
  }
}
