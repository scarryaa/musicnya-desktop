import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  waitForSplash(): Promise<void> {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }
}
