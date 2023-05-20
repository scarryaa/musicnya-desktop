import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';

@Injectable({ providedIn: 'root', deps: [HttpClient] })
export class HttpService {
  DEV_TOKEN = 'UNDEFINED';

  getConfig(): Promise<boolean> {
    return fetch('assets/config.json')
      .then((response) => response.json())
      .then((config: any) => (this.DEV_TOKEN = config.DEV_TOKEN));
  }
}
