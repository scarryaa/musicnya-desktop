import Modal from '../../components/window/modal.svelte';

export const hide = () => {
	document.querySelector('.modal')?.remove();
};

export const show = (component: any, width: number, height: number) => {
	new Modal({
		target: document.body,
		props: {
			component: component,
			width: width,
			height: height
		}
	});
};
