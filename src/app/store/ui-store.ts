import { Injectable, OnDestroy } from "@angular/core";
import { Constants, CurrentPlatform } from "../constants/constants";
import { Store } from "./store";
import { MusickitStore, MusickitState } from "ngx-apple-music";
import { distinctUntilChanged, map, Subscription } from "rxjs";

export enum PlaylistDrawerOffset {
    CollapsedDrawerWindows = 300,
    CollapsedDrawerMac = 315,
    CollapsedDrawerWeb = 272,
    Windows = 272,
    Mac = 287,
    Web = 272
}

enum ShuffleIcon {
    Standard = "shuffle",
    On = "shuffle_on"
}

enum RepeatIcon {
    Standard = "repeat",
    One = "repeat_one"
}

enum PlayPauseIcon {
    Play = "play_circle",
    Pause = "pause_circle"
}

enum RepeatIconOpacity {
    Default = 0.5,
    Active = 1.0
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
    shuffleIcon: ShuffleIcon;
    repeatIcon: RepeatIcon;
    repeatIconOpacity: RepeatIconOpacity;
    playPauseIcon: PlayPauseIcon;
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
    playlistDrawerTopOffset: 287,
    shuffleIcon: ShuffleIcon.Standard,
    repeatIcon: RepeatIcon.Standard,
    repeatIconOpacity: RepeatIconOpacity.Default,
    playPauseIcon: PlayPauseIcon.Play
}

@Injectable({
    providedIn: 'root'
})
export class UIStore extends Store<UIState> implements OnDestroy {
    subs: Subscription = new Subscription();
    
    constructor(private musickitStore: MusickitStore) { 
        super(initialState); 
        
        this.subs.add(musickitStore.state$.pipe(map((state: MusickitState) => state.isPlaying),
        distinctUntilChanged()).subscribe((value: boolean) => {
            this.setState(() => ({ playPauseIcon: value ? PlayPauseIcon.Pause : PlayPauseIcon.Play }));
        }));
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
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

    toggleShuffleIcon(shuffleMode: MusicKit.PlayerShuffleMode) {
        this.setState((state) => ({ ...state, ...{ shuffleIcon: this.mapShuffleModeToIcon(shuffleMode) } }));
    }

    toggleRepeatIcon(repeatMode: MusicKit.PlayerRepeatMode) {
        this.setState((state) => ({ ...state, ...{ repeatIcon: this.mapRepeatModeToIcon(repeatMode), 
            repeatIconOpacity: this.mapRepeatModeToOpacity(repeatMode) } }));
    }
    
    // helpers

    mapShuffleModeToIcon(shuffleMode: MusicKit.PlayerShuffleMode): ShuffleIcon {
        if (shuffleMode === MusicKit.PlayerShuffleMode.off) return ShuffleIcon.Standard;
        else return ShuffleIcon.On;
    }

    mapRepeatModeToIcon(repeatMode: MusicKit.PlayerRepeatMode): RepeatIcon {
        if (repeatMode == MusicKit.PlayerRepeatMode.none) return RepeatIcon.Standard;
        else if (repeatMode == MusicKit.PlayerRepeatMode.all) return RepeatIcon.Standard;
        else return RepeatIcon.One;
    }

    mapRepeatModeToOpacity(repeatMode: MusicKit.PlayerRepeatMode): RepeatIconOpacity {
        if (repeatMode == MusicKit.PlayerRepeatMode.none) return RepeatIconOpacity.Default;
        else return RepeatIconOpacity.Active;
    }
}