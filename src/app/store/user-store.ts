import { Injectable, OnDestroy } from "@angular/core";
import { Store } from "./store";
import { MusickitStore, MusickitState } from "ngx-apple-music";
import { distinctUntilChanged, map, Observable, of, Subscription } from "rxjs";

export interface UserState {
    playlists: MusicKit.LibraryPlaylists[]
}

const initialState: UserState = {
    playlists: [],
}

@Injectable({
    providedIn: 'root'
})
export class UserStore extends Store<UserState> implements OnDestroy {
    subs: Subscription;

    constructor(private musickitStore: MusickitStore) { 
        super(initialState); 

        this.subs = new Subscription();

        this.subs.add(musickitStore.state$.pipe(map((state: MusickitState) => state.userPlaylists),
        distinctUntilChanged()).subscribe((value: any) => {
            this.setState((state) => ( {...state, playlists: value }))
        }));
    }
    
    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}