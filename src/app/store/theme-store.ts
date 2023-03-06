import { Injectable, OnDestroy } from "@angular/core";
import { Constants } from "../constants/constants";
import { Store } from "./store";

export interface ThemeState {
    primaryColor: string,
    accentColor: string,
    darkTheme: boolean,
    headerColor: string
}

const initialState: ThemeState = {
    primaryColor: Constants.colorPresets['purplePink'].primaryColor,
    accentColor: Constants.colorPresets['purplePink'].accentColor,
    darkTheme: true,
    headerColor: Constants.headerColorDark
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
}