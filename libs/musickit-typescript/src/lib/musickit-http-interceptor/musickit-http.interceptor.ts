import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class MusickitHttpInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);
    request.clone({ headers: this.handleBasedOnUrl(request) });
    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          event = event.clone({ headers: this.replaceHeaders(event.headers) });
        }
        return event;
      })
    );
  }

  handleBasedOnUrl(request: HttpRequest<unknown>) {
    request.headers.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    request.headers.set('sec-fetch-site', 'same-site');
    request.headers.set('DNT', '1');

    if (request.url === 'https://buy.itunes.apple.com/account/web/info') {
      request.headers.set('Access-Control-Request-Headers', 'media-user-token');
      //TODO better way to do this, tauri doesn't have webContents (?)
      const itspod = '53';
      request.headers.set('Cookie', `itspod=${itspod}`);
    } else if (request.url.includes('apple.com')) {
      request.headers.set('authority', 'amp-api.music.apple.com');
      request.headers.set('origin', 'https://beta.music.apple.com');
      request.headers.set('referer', 'https://beta.music.apple.com');
    }
    console.log(request);
    return request.headers;
  }

  replaceHeaders(headers: HttpHeaders) {
    headers.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    return headers;
  }
}
