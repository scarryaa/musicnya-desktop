import { Injectable, OnDestroy } from "@angular/core";
import { Constants } from "../constants/constants";
import { Store } from "./store";

export interface ThemeState {
    primaryColor: string,
    accentColor: string,
    overrideColor: string;
    darkTheme: boolean,
    headerColor: string,
    shuffleButtonColor: string;
    repeatButtonColor: string;
}

const initialState: ThemeState = {
    primaryColor: Constants.colorPresets['purplePink'].primaryColor,
    accentColor: Constants.colorPresets['purplePink'].accentColor,
    overrideColor: Constants.white,
    darkTheme: true,
    headerColor: Constants.headerColorDark,
    shuffleButtonColor: Constants.white,
    repeatButtonColor: Constants.white
}

@Injectable({
    providedIn: 'root'
})
export class ThemeStore extends Store<ThemeState> implements OnDestroy {
    constructor() { super(initialState); }
    
    ngOnDestroy(): void {}

    setThemePair(primary?: string, accent?: string): void {
        let newProps: Object = {};
        if (primary && accent) newProps = {primaryColor: primary, accentColor: accent};
        else if (primary && !accent) newProps = {primaryColor: primary}; 
        else if (!primary && accent) newProps = {accentColor: accent};
        else throw new Error("At least one color must be provided to change the theme.");   
        this.setState((state) => ({ ...state, ...newProps }));
    }

    toggleDarkTheme(): void {
        this.setState((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    setHeaderColor(color: string = Constants.headerColorDark) {
        this.setState((state) => ({ ...state, headerColor: color}));
    }

    setOverrideColor(color: string) {
        this.setState((state) => ({ ...state, overrideColor: color}));
    }

    toggleShuffleColor(shuffleMode: MusicKit.PlayerShuffleMode) {
        this.state.shuffleButtonColor = this.mapShuffleModeToColor(shuffleMode);
    }

    toggleRepeatColor(repeatMode: MusicKit.PlayerRepeatMode) {
        this.state.repeatButtonColor = this.mapRepeatModeToColor(repeatMode);
    }

    // helpers

    mapShuffleModeToColor(shuffleMode: MusicKit.PlayerShuffleMode) {
        if (shuffleMode === MusicKit.PlayerShuffleMode.off) return this.state.overrideColor;
        else return this.state.accentColor;
    }

    mapRepeatModeToColor(repeatMode: MusicKit.PlayerRepeatMode) {
        if (repeatMode == MusicKit.PlayerRepeatMode.one) return this.state.accentColor;
        else if (repeatMode == MusicKit.PlayerRepeatMode.all) return this.state.accentColor;
        else return this.state.overrideColor;
    }
}