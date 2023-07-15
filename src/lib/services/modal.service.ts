import Modal from '../../components/window/modal.svelte';
import Login from '../../components/login.svelte';

let modal;

export const hide = () => {
	document.querySelector('.modal').remove();
};

export const show = () => {
	modal = new Modal({
		target: document.body,
		props: {
			component: Login
		}
	});
};
