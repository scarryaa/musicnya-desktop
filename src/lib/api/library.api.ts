export const removeAlbumFromLibrary = (id) => {
	// remove album from view
	if (window.location.pathname === '/library/albums') {
		const album = document.querySelector(`[data-id="${id}"]`);
		album?.remove();
	}
};
