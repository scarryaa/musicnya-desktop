export class Preferences {
    userPrimaryColor: string;
    userAccentColor: string;
    drawerCollapsed: boolean;
    darkTheme: boolean;

    constructor(userPrimaryColor: string, userAccentColor: string, drawerCollapsed: boolean, darkTheme: boolean) {
        this.userPrimaryColor = userPrimaryColor;
        this.userAccentColor = userAccentColor;
        this.drawerCollapsed = drawerCollapsed;
        this.darkTheme = darkTheme;
    }
}
