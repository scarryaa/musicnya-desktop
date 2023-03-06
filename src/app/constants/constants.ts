export const enum CurrentPlatform {
    Windows,
    Linux,
    Mac,
    Web
}

type ColorPresets = Record<string, ColorPreset>;

export interface ColorPreset {
    primaryColor: string;
    accentColor: string;
}

export class Constants {
    static currentPlatform: CurrentPlatform;

    static setCurrentPlatform(platform: CurrentPlatform = CurrentPlatform.Web): void {
        Constants.currentPlatform = platform;
    }

    static colorPresets: ColorPresets = {
        purplePink: { primaryColor: "#4c4978", accentColor: "#ff4d9d"}, darkTealPink: { primaryColor: "#418975", accentColor: "#ff7ca1"}, 
        darkVioletPink: { primaryColor: "#772245", accentColor: "#ffa4c0"}, darkSapphireBlueMono: { primaryColor: "#006480", accentColor: "#b3e7ff"},
        darkLeafGreenMono: { primaryColor: "#6f8947", accentColor: "#dced7d"}, darkFlameOrangeMono: { primaryColor: "#e65825", accentColor: "#fed2c2"}, 
        darkGoldMono: { primaryColor: "#c9a847", accentColor: "#fff2d9"}, pinkMono: { primaryColor: "#e65382", accentColor: "#ffe4ed"},
        darkPurplePink: { primaryColor: "#5e1649", accentColor: "#ffd0e9"}, redPink: { primaryColor: "#df003f", accentColor: "#ffdada"},
        darkTealMono: { primaryColor: "#004844", accentColor: "#a8c4c0"}, darkPinkMono: { primaryColor: "#b18a82", accentColor: "#ffdad3"},
        blueMono: { primaryColor: "#0086e7", accentColor: "#beddff"}, darkLavenderPink: { primaryColor: "#7d4993", accentColor: "#f7d4ff"},
        darkPrussianBlueMono: { primaryColor: "#00324a", accentColor: "#d4e7ff"}
    } as const;

    static darkThemeOverride: string = "#211e1e";
    static headerColor: string = "#fafafa";
    static headerColorDark: string = "#141414";
}