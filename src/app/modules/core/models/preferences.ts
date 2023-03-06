export class Preferences {
    primaryColor: string;
    accentColor: string;
    drawerCollapsed: boolean;
    darkTheme: boolean;

    constructor(primaryColor: string, accentColor: string, drawerCollapsed: boolean, darkTheme: boolean) {
        this.primaryColor = primaryColor;
        this.accentColor = accentColor;
        this.drawerCollapsed = drawerCollapsed;
        this.darkTheme = darkTheme;
    }
}