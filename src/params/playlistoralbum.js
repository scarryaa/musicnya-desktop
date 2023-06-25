/** @type {import('@sveltejs/kit').ParamMatcher} */
export const match = (param) => {
    return new RegExp('album|playlist|library-playlist|library-album').test(param);
}