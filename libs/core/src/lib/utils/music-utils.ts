// helper function to replace the {w}x{h} in the url with the desired size
export const formatArtworkUrl = (url: string | undefined, size?: number) => {
  if (!url) {
    return;
  }
  return url
    ?.replace('{w}x{h}', `${size || 64}x${size || 64}`)
    ?.replace('{f}', 'webp');
};

// helper function to ligtent or darken a color
export const adjustColor = (color: string, amount: number): string => {
  let usePound = false;

  if (color[0] === '#') {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);

  let r = num >> 16;
  let g = (num >> 8) & 0x00ff;
  let b = num & 0x0000ff;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  // Calculate distance to white (255) or black (0)
  let distance = amount > 0 ? 255 - max : min;

  // If the adjustment amount is greater than the distance, cap the adjustment
  if (Math.abs(amount) > distance) {
    amount = distance * (amount > 0 ? 1 : -1);
  }

  r += amount;
  g += amount;
  b += amount;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};
