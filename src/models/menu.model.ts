export interface IMenuItem {
	title: string;
	icon: string;
	route: string;
	action?: () => void;
	disabled?: boolean;
	children?: IMenuItem[];
}
