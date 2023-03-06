import { Injectable, OnDestroy } from "@angular/core";
import { Constants, CurrentPlatform } from "../constants/constants";
import { Store } from "./store";

export enum PlaylistDrawerOffset {
    CollapsedDrawerWindows = 300,
    CollapsedDrawerMac = 315,
    CollapsedDrawerWeb = 272,
    Windows = 272,
    Mac = 287,
    Web = 272
}

export interface UIState {
    drawerCollapsed: boolean;
    headerMargin: number;
    showFileMenuButton: boolean;
    headerHeight: number;
    footerHeight: number;
    headerTitle: string;
    scrollPosition: number;
    backButtonEnabled: boolean;
    forwardButtonEnabled: boolean;
    headerPageControlsOpacity: number;
    drawerScrollbarVisible: boolean;
    playlistDrawerTopOffset: number;
}

const initialState: UIState = {
    drawerCollapsed: false,
    headerMargin: 17.5,
    showFileMenuButton: false,
    headerHeight: 45,
    footerHeight: 75,
    headerTitle: '',
    scrollPosition: 0,
    backButtonEnabled: false,
    forwardButtonEnabled: false,
    headerPageControlsOpacity: 0,
    drawerScrollbarVisible: false,
    playlistDrawerTopOffset: 287
}

@Injectable({
    providedIn: 'root'
})
export class UIStore extends Store<UIState> implements OnDestroy {
    constructor() { super(initialState); }

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

    toggleDrawer() {
        this.setState((state) => ({ drawerCollapsed: !state.drawerCollapsed }));
        this.setPlaylistDrawerTopOffset(this.determinePlaylistDrawerOffset());
    }

    setDrawer(collapsed: boolean) {
        this.setState((state) => ({ drawerCollapsed: collapsed }));
        this.setPlaylistDrawerTopOffset(this.determinePlaylistDrawerOffset());
    }

    setShowFileMenuButton() {
        this.setState((state) => ({ showFileMenuButton: true }));
    }

    setHeaderTitle(title: string) {
        this.setState((state) => ({ headerTitle: title }));
    }

    setNoHeaderMargin() {
        this.setState((state) => ({ headerMargin: 0 }));
    }

    setHeaderPageControlsOpacity(opacity: number) {
        this.setState((state) => ({ headerPageControlsOpacity: opacity }));
    }

    resetHeaderPageControlsOpacity() {
        this.setState((state) => ({ headerPageControlsOpacity: 0 }));
    }

    setDrawerScrollbarVisible() {
        this.setState((state) => ({ drawerScrollbarVisible: true }));
    }

    resetDrawerScrollbarVisible() {
        this.setState((state) => ({ drawerScrollbarVisible: false }));
    }

    setPlaylistDrawerTopOffset(offset: PlaylistDrawerOffset) {
        this.setState((state) => ({ playlistDrawerTopOffset: offset }));
    }

    setBackButtonEnabled(enabled: boolean) {
        this.setState((state) => ({ backButtonEnabled: enabled }));
    }

    setForwardButtonEnabled(enabled: boolean) {
        this.setState((state) => ({ forwardButtonEnabled: enabled }));
    }

    determinePlaylistDrawerOffset(): PlaylistDrawerOffset {
        if (Constants.currentPlatform == CurrentPlatform.Windows)
            return this.state.drawerCollapsed ? PlaylistDrawerOffset.CollapsedDrawerWindows : PlaylistDrawerOffset.Windows;
        else if (Constants.currentPlatform == CurrentPlatform.Mac) 
            return this.state.drawerCollapsed ? PlaylistDrawerOffset.CollapsedDrawerMac : PlaylistDrawerOffset.Mac;
        else return this.state.drawerCollapsed ? PlaylistDrawerOffset.CollapsedDrawerWeb : PlaylistDrawerOffset.Web;
    }
}