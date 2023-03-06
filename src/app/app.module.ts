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
import { MatMenuModule } from '@angular/material/menu';
import { InitializationService } from './shared/services/initialization/initialization.service';
import { UIStore } from 'src/app/store/ui-store';
import { ThemeStore } from 'src/app/store/theme-store';
import { LocalStorageService } from './shared/services/local-storage/local-storage.service';
import { StyleService } from './shared/services/style/style.service';
import { SettingsStore } from './store/settings-store';
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

const globalSlideToggleConfig: MatSlideToggleDefaultOptions = {
  color: "accent"
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
    MatMenuModule
  ],
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: globalTooltipConfig },
    { provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS, useValue: globalSlideToggleConfig },
    InitializationService, {
      provide: APP_INITIALIZER,
      useFactory: environment.useElectron ? (electronService: ElectronService) => async () => await new InitializationService()
        .setPlatform(electronService) :
        () => async () => await new InitializationService().setPlatform(),
      deps: environment.useElectron ? [ElectronService] : [],
      multi: true
    },
    InitializationService, {
      provide: APP_INITIALIZER,
      useFactory: (playlistDataService: PlaylistDataService,
        themeStore: ThemeStore, uiStore: UIStore, styleService: StyleService,
        localStorageService: LocalStorageService) => async () => await new InitializationService()
        .initialize(playlistDataService, themeStore, uiStore, styleService, localStorageService),
      deps: [PlaylistDataService, ThemeStore, UIStore, StyleService, LocalStorageService],
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
export class AppModule {
  constructor(settingsStore: SettingsStore) {}
}
