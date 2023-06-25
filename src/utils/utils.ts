export const replaceUrlPlaceholders = (url: string, size: string) => {
	return url.replace('{w}x{h}', `${size}x{size}`).replace('{f}', 'webp');
};
