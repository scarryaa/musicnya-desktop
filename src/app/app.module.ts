import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { APP_INITIALIZER } from '@angular/core';
import { PlaylistDataService } from './shared/services/playlist-data/playlist-data.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { ElectronService } from './shared/services/electron/electron.service';
import { MatSlideToggleDefaultOptions, MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS } from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { InitializationService } from './shared/services/initialization/initialization.service';
import { UIStore } from 'src/app/store/ui-store';
import { ThemeStore } from 'src/app/store/theme-store';
import { StyleService } from './shared/services/style/style.service';
import { SettingsStore } from './store/settings-store';
import { environment } from 'src/environments/environment';
import { MusickitStore } from "ngx-apple-music";
import { UserStore } from './store/user-store';
import { LocalStorageService } from './shared/services/local-storage/local-storage.service';
import { CurrentPlatform } from './constants/constants';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { H401Interceptor } from './modules/core/error-handling/http-interceptor';
import { AwsService } from './shared/services/aws/aws.service';

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

const globalSlideToggleConfig: MatSlideToggleDefaultOptions = {
  color: "accent"
}

export function initConfiguration(initializationService: InitializationService,
  themeStore: ThemeStore, uiStore: UIStore, styleService: StyleService, localStorageService: LocalStorageService, 
  electronService: ElectronService): () => Promise<any> {
    return () => initializationService.initialize(themeStore, uiStore, styleService, localStorageService, electronService);
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
    SharedModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: globalTooltipConfig },
    { provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS, useValue: globalSlideToggleConfig },
    { provide: HTTP_INTERCEPTORS,
      useClass: H401Interceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (musickitStore: MusickitStore, awsService: AwsService) => async () => musickitStore.initMusicKit(await awsService.refreshToken(), "musicnya", "0.3.1-alpha.0")
      .catch((error: any) => Promise.resolve(error))
      .then(() => musickitStore.authorizeUser().then(() => console.log(musickitStore.instance))).then(() => musickitStore.getUserPlaylists()),
      deps: [MusickitStore, AwsService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfiguration,
      deps: [InitializationService, ThemeStore, UIStore, StyleService, LocalStorageService, environment.useElectron ? ElectronService : null],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(settingsStore: SettingsStore, userStore: UserStore) { }
}
