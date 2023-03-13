import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { MusickitStore } from "ngx-apple-music";

@Injectable()
export class H401Interceptor implements HttpInterceptor {
    constructor(private musicKitStore: MusickitStore) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone();

        return next.handle(request).pipe(catchError((err, caught) => {
            console.log(err);
            throw err;
        }));
    }
}