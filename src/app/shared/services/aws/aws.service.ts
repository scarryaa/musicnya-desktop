import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AwsService {
    URL: string;
    constructor(private httpClient: HttpClient) {
        this.URL = "https://gbog6t2kdpthu7iwhpm32wcol40rneif.lambda-url.us-east-1.on.aws/";
    }

    async refreshToken(): Promise<any> {
        return new Promise((resolve, reject) => 
            this.httpClient.get(this.URL, { headers: { 'Access-Control-Allow-Origin': '*'}, responseType: 'text'}).pipe(first()).subscribe((res: any) => {
            resolve(res);
        }));
    }
}