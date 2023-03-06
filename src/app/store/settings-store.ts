import { Injectable, OnDestroy } from "@angular/core";
import { distinctUntilChanged, map, Subscription } from "rxjs";
import { LocalStorageService, StorageKeys } from "src/app/shared/services/local-storage/local-storage.service";
import { doneWithInit } from "../helpers/helpers";
import { Store } from "./store";
import { ThemeState, ThemeStore } from "./theme-store";
import { UIState, UIStore } from "./ui-store";

export interface SettingsState {
    primaryColor: string,
    accentColor: string,
    drawerCollapsed: boolean,
    darkTheme: boolean
}

const initialState: SettingsState = {
    primaryColor: '#5a578e',
    accentColor: '#ff4080',
    drawerCollapsed: false,
    darkTheme: true
}

@Injectable({
    providedIn: 'root'
})
export class SettingsStore extends Store<SettingsState> implements OnDestroy {
    subs: Subscription = new Subscription();

    constructor(public uiStore: UIStore, private localStorageService: LocalStorageService,
        public themeStore: ThemeStore) {
        super(initialState);
        this.subs.add(uiStore.state$.pipe(map((state: UIState) => state.drawerCollapsed),
        distinctUntilChanged()).subscribe((value: boolean) => {
            this.setState(() => ({ drawerCollapsed: value }));
            if (doneWithInit()) {
                console.log(doneWithInit());
                this.localStorageService.setItem(StorageKeys.MusicnyaPrefs, {...this.state, drawerCollapsed: value});
            }
        }));

        this.subs.add(themeStore.state$.pipe(distinctUntilChanged()).subscribe((themeState: ThemeState) => {
            this.setState((state) => ({ ...state, ...themeState}));
            if (doneWithInit()) this.localStorageService.setItem(StorageKeys.MusicnyaPrefs, {...this.state, ...themeState});
        }));
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}