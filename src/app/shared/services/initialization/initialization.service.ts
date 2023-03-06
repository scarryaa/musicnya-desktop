import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Command, ElectronService } from '../electron/electron.service';
import { PlaylistDataService } from '../playlist-data/playlist-data.service';
import { UIStore } from 'src/app/store/ui-store';
import { Preferences } from 'src/app/modules/core/models/preferences';
import { Constants, CurrentPlatform } from 'src/app/constants/constants';
import { convertStringToPlatform, setInitDone } from 'src/app/helpers/helpers';
import { first } from 'rxjs';
import { ThemeStore } from 'src/app/store/theme-store';
import { LocalStorageService, StorageKeys } from '../local-storage/local-storage.service';
import { StyleService } from '../style/style.service';

@Injectable({
  providedIn: 'root',
})
export class InitializationService {
  constructor() { }

  async initialize(playlistDataService: PlaylistDataService,
    themeStore: ThemeStore, uiStore: UIStore, styleService: StyleService,
    localStorageService: LocalStorageService): Promise<any> {
    return playlistDataService.getSamplePlaylist()
      .then(() => {
        if (Constants.currentPlatform == (CurrentPlatform.Windows || CurrentPlatform.Web)) {
          uiStore.setNoHeaderMargin();
          if (CurrentPlatform.Windows) uiStore.setShowFileMenuButton();
          uiStore.setPlaylistDrawerTopOffset(uiStore.determinePlaylistDrawerOffset());
        };
      })
      .then(() => localStorageService.getItem(StorageKeys.MusicnyaPrefs))
      .then((prefs: string | null) => prefs ? JSON.parse(prefs) : null)
      .catch((error: any) => console.error(error))
      .then((prefs: Preferences | null) => {
        if (prefs) {
          themeStore.setState((state) => ({
            ...state, ...{
              primaryColor: prefs.primaryColor,
              accentColor: prefs.accentColor, 
              darkTheme: prefs.darkTheme,
              headerColor: prefs.darkTheme ? Constants.headerColorDark : Constants.headerColor
            }
          }));
          uiStore.setDrawer(prefs.drawerCollapsed);
          styleService.setDarkTheme(prefs.darkTheme);
          styleService.setTheme({primaryColor: prefs.primaryColor, accentColor: prefs.accentColor});
        }
      })
      .catch((error: any) => console.error(error))
      .finally(() => setInitDone());
  }

  async setPlatform(electronService?: ElectronService): Promise<CurrentPlatform> {
    return new Promise<CurrentPlatform>((resolve) => {
      if (environment.useElectron && electronService) {
        electronService!.sendMessage(Command.GetPlatform);
        electronService!.messages$
          .pipe(first(data => data.command == Command.GetPlatform, { command: null, data: '' }))
          .subscribe(data => Constants.setCurrentPlatform(convertStringToPlatform(data.data!)))
          .add(() => resolve(Constants.currentPlatform));
      } else {
        Constants.setCurrentPlatform();
        resolve(Constants.currentPlatform);
      }
    });
  }
}