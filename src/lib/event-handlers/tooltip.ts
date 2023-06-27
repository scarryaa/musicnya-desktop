import Tooltip from '../../components/tooltip.svelte';

let timer: NodeJS.Timer;

export const tooltip = (
	node: HTMLElement,
	props: { text: string; delay: number; position: 'left' | 'right' | 'top' | 'bottom' }
) => {
	const handleMouseOver = (event: MouseEvent | Event) => {
		if (node.contains && node.contains(event.target as Node)) {
			// start timer
			timer = setTimeout(() => {
				new Tooltip({
					target: node,
					props: {
						position: props.position,
						text: props.text
					}
				});
			}, props.delay || 500);
		}
	};

	const handleMouseOut = (event: MouseEvent | Event) => {
		if (node.contains && node.contains(event.target as Node)) {
			// remove tooltip
			clearInterval(timer);
			if (document.querySelector('.tooltip-wrapper')) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				node.removeChild(document.querySelector('.tooltip-wrapper')!);
			}
		}
	};

	const handleClick = (event: MouseEvent | Event) => {
		if (node.contains && node.contains(event.target as Node)) {
			// remove tooltip
			clearInterval(timer);
			if (document.querySelector('.tooltip-wrapper')) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				node.removeChild(document.querySelector('.tooltip-wrapper')!);
			}
		}
	};

	node.addEventListener('mouseenter', handleMouseOver);
	node.addEventListener('mouseleave', handleMouseOut);
	node.addEventListener('focusin', handleMouseOver);
	node.addEventListener('focusout', handleMouseOut);
	node.addEventListener('mousedown', handleClick);

	return {
		update(newProps: {
			text: string;
			delay: number;
			position: 'left' | 'right' | 'top' | 'bottom';
		}) {
			props = newProps;
		},

		destroy() {
			node.removeEventListener('mouseover', handleMouseOver);
			node.removeEventListener('mouseout', handleMouseOut);
		}
	};
};
