import { get } from 'svelte/store';
import { libraryPlaylists } from '../../../stores/musickit.store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	return { media: get(libraryPlaylists) };
}
