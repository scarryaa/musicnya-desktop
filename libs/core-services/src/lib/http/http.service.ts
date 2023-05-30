import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Config {
  DEV_TOKEN: string;
}

@Injectable({ providedIn: 'root', deps: [HttpClient] })
export class HttpService {
  DEV_TOKEN = 'UNDEFINED';

  getConfig(): Promise<string> {
    return fetch('./assets/config.json')
      .then((response) => response.json())
      .then((config: Config) => (this.DEV_TOKEN = config.DEV_TOKEN))
      .then(() => this.DEV_TOKEN)
      .catch((error) => {
        console.error('Error:', error);
        return 'UNDEFINED';
      });
  }
}
