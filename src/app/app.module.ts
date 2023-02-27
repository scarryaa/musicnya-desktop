import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { APP_INITIALIZER } from '@angular/core';
import { PlaylistDataService } from './shared/services/playlist-data/playlist-data.service';
import { InitializationService } from 'ngx-apple-music';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { ElectronService } from './shared/services/electron/electron.service';
import { Observable, Subscriber } from 'rxjs';
import { UserPrefsService } from './shared/services/user-prefs/user-prefs.service';
import { environment } from 'src/environments/environment';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  animation: {
    enterDuration: 0,
    exitDuration: 0
  }
};

const globalTooltipConfig: MatTooltipDefaultOptions = {
  showDelay: 300,
  hideDelay: 0,
  touchendHideDelay: 0
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: globalTooltipConfig},
    PlaylistDataService, {
    provide: APP_INITIALIZER,
    useFactory: (pData: PlaylistDataService) => () => pData.getSamplePlaylist(),
    deps: [PlaylistDataService],
    multi: true
  },
  ElectronService, {
    provide: APP_INITIALIZER,
    useFactory: environment.enableWindowControls ? ((electronService: ElectronService, userPrefsService: UserPrefsService) => () => { var platform$ = new Observable<boolean>((observer: Subscriber<boolean>) =>
      electronService.getIpcRenderer().receive('fromMain', (arg: any, event: any) => observer.next(arg)));

    platform$.subscribe((res: boolean) => userPrefsService.setPlatform(res) );
    electronService.getIpcRenderer().send("toMain", {command: 'whatPlatform'});
    }) : () => () => {},
    deps: [ElectronService, UserPrefsService],
    multi: true
  }
  //   InitializationService, {
  //   provide: APP_INITIALIZER,
  //   useFactory: (initService: InitializationService) => () => initService.initMusicKit('DEV_TOKEN',
  //     'musicnya', '1.0.0'),
  //   deps: [InitializationService],
  //   multi: true
  // }],
],
  bootstrap: [AppComponent],
})
export class AppModule { }
