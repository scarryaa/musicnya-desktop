import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../models/config.model';

@Injectable({ providedIn: 'root', deps: [HttpClient] })
export class HttpService {
  DEV_TOKEN = 'UNDEFINED';

  getConfig(): Promise<boolean> {
    return fetch('assets/config.json')
      .then((response) => response.json())
      .then((config: Config) => (this.DEV_TOKEN = config.DEV_TOKEN))
      .then(() => true)
      .catch((error) => {
        console.error('Error:', error);
        return false;
      });
  }
}
