import { FastAverageColor } from "fast-average-color";

const fac = new FastAverageColor();

export const getDominantColor = async (image: string) => {
    const dominantColor = await fac.getColorAsync(image, { 
        ignoredColor: [[255, 255, 255, 255, 50], [0, 0, 0, 255, 50]],
        algorithm: 'dominant',
        defaultColor: [200, 200, 200, 255],
    });
    return dominantColor;
}