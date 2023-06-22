import { getLibraryPlaylist } from '../../../../utils/apple-music-api';
import { libraryPlaylists } from '../../../../store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        libraryPlaylist: get(libraryPlaylists).find(playlist => playlist.id === params.id) || getLibraryPlaylist(params.id)
    };
}