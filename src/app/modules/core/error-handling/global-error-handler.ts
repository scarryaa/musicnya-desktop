import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, ErrorHandler, NgZone } from "@angular/core";
import { AwsService } from "src/app/shared/services/aws/aws.service";
import { MusickitStore } from 'ngx-apple-music';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone, private awsService: AwsService, private musickitStore: MusickitStore) {}

  async handleError(error: any) {
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }

    if (error){
      if (error.name == MusicKit.MKError.UNAUTHORIZED_ERROR || error.message == MusicKit.MKError.UNAUTHORIZED_ERROR || error == MusicKit.MKError.UNAUTHORIZED_ERROR) {
        console.error('Need a new developer token.');
        this.musickitStore.reconfigure(await this.awsService.refreshToken(), 'musicnya', '0.3.1-alpha.0');
      }
    }
    this.zone.run(() => console.error(error));
  }
}