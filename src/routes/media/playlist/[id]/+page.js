import { getLibraryPlaylist } from '../../../../utils/apple-music-api';
import { libraryPlaylists } from '../../../../store';
import { get } from 'svelte/store';
import { getDominantColor } from '../../../../utils/color-service';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        libraryPlaylist: get(libraryPlaylists).find(playlist => playlist.id === params.id) || getLibraryPlaylist(params.id).then(playlist => {
            libraryPlaylists.update(playlists => {
                playlists.push(playlist);
                return playlists;
            }
            );
            return playlist;
        }).then(playlist => {
            getDominantColor(playlist.attributes.artwork.url).then(color => {
                playlist.color = color;
            }
            );
            return playlist;
        })
    };
}