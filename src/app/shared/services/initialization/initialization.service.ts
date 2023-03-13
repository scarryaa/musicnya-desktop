import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Command, ElectronService } from '../electron/electron.service';
import { PlaylistDataService } from '../playlist-data/playlist-data.service';
import { UIStore } from 'src/app/store/ui-store';
import { Preferences } from 'src/app/modules/core/models/preferences';
import { Constants, CurrentPlatform } from 'src/app/constants/constants';
import { convertStringToPlatform, setInitDone } from 'src/app/helpers/helpers';
import { first, map } from 'rxjs';
import { ThemeStore } from 'src/app/store/theme-store';
import { LocalStorageService, StorageKeys } from '../local-storage/local-storage.service';
import { StyleService } from '../style/style.service';

@Injectable({
  providedIn: 'root',
})
export class InitializationService {
  constructor() { }

  initialize(themeStore: ThemeStore, uiStore: UIStore, styleService: StyleService,
    localStorageService: LocalStorageService, electronService?: ElectronService): Promise<any> {
      let promise = new Promise<any>(async (resolve, reject) => {
        await this.setPlatform(electronService);
            if (Constants.currentPlatform === CurrentPlatform.Windows || Constants.currentPlatform === CurrentPlatform.Web) {
              uiStore.setNoHeaderMargin();
              if (Constants.currentPlatform === CurrentPlatform.Windows) uiStore.setShowFileMenuButton();
              uiStore.setPlaylistDrawerTopOffset(uiStore.determinePlaylistDrawerOffset());
            };
            var prefs = localStorageService.getItem(StorageKeys.MusicnyaPrefs);
            var parsed = prefs ? JSON.parse(prefs) : null;
    
            if (parsed) {
              themeStore.setState((state) => ({
                ...state, ...{
                  primaryColor: parsed.primaryColor,
                  accentColor: parsed.accentColor, 
                  darkTheme: parsed.darkTheme,
                  headerColor: parsed.darkTheme ? Constants.headerColorDark : Constants.headerColor
                }
              }));
              uiStore.setDrawer(parsed.drawerCollapsed);
              styleService.setDarkTheme(parsed.darkTheme);
              styleService.setTheme({primaryColor: parsed.primaryColor, accentColor: parsed.accentColor});
            }
            setInitDone();
            resolve(null);
          }
        )
      return promise;
    }

  setPlatform(electronService?: ElectronService): Promise<CurrentPlatform> {
    let promise = new Promise<CurrentPlatform>((resolve) => {
      if (environment.useElectron && electronService) {
        electronService!.sendMessage(Command.GetPlatform);
        electronService!.messages$
          .pipe(first(data => data.command == Command.GetPlatform, { command: null, data: '' }))
          .subscribe(data => { Constants.setCurrentPlatform(convertStringToPlatform(data.data!));
            resolve(Constants.currentPlatform)});
      } else {
        Constants.setCurrentPlatform();
        resolve(Constants.currentPlatform);
      }
    });
    return promise;
  }
}