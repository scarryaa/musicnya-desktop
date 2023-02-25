export class Filter {
    name: string;
    selected: boolean;
    overflowing: boolean;
    hidden: boolean;

    constructor(name: string, selected: boolean, overflowing: boolean, hidden: boolean) {
        this.name = name;
        this.selected = selected;
        this.overflowing = overflowing;
        this.hidden = hidden;
    }
}
