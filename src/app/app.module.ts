import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './modules/core/core.module';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { APP_INITIALIZER } from '@angular/core';
import { PlaylistDataService } from './services/playlist-data/playlist-data.service';
import { SongPipe } from './pipes/song.pipe';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  animation: {
    enterDuration: 0,
    exitDuration: 0
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig},
  PlaylistDataService, {
    provide: APP_INITIALIZER,
    useFactory: (pData: PlaylistDataService) => () => {return pData.getSamplePlaylist()},
    deps: [PlaylistDataService],
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
