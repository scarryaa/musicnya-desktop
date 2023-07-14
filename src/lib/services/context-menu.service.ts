export const createContextMenu = (options) => {
	const { items, target } = options;
	const contextMenu = document.createElement('div');
	contextMenu.classList.add('context-menu');
	contextMenu.style.left = `${options.x}px`;
	contextMenu.style.top = `${options.y}px`;
	contextMenu.style.position = 'absolute';
	contextMenu.style.zIndex = '1000';
	contextMenu.style.backgroundColor = 'white';
	contextMenu.style.border = '1px solid #ccc';
	contextMenu.style.borderRadius = '5px';
	contextMenu.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';
	contextMenu.style.padding = '5px 0';
	contextMenu.style.width = '200px';
	contextMenu.style.height = 'auto';

	items.forEach((item) => {
		const menuItem = document.createElement('div');
		menuItem.classList.add('menu-item');
		menuItem.style.padding = '5px 10px';
		menuItem.style.cursor = 'pointer';
		menuItem.style.userSelect = 'none';
		menuItem.innerHTML = item.text;
		menuItem.addEventListener('click', () => {
			contextMenu.remove();
			item.action();
		});
		contextMenu.appendChild(menuItem);
	});
	document.body.appendChild(contextMenu);

	window.onmousedown = (e) => {
		if (!contextMenu.contains(e.target)) {
			contextMenu.remove();
			// disable scrolling when context menu is open
			document.querySelector('content-wrapper').style.overflow = 'auto';
			window.onmousedown = null;
		}
	};

	//prevent scrolling when context menu is open
	document.body.style.overflow = 'hidden';

	// prevent context menu from going off screen
	const { innerWidth, innerHeight } = window;
	const { width, height } = contextMenu.getBoundingClientRect();
	const { x, y } = contextMenu.getBoundingClientRect();
	if (x + width > innerWidth) {
		contextMenu.style.left = `${innerWidth - width}px`;
	}
	if (y + height > innerHeight) {
		contextMenu.style.top = `${innerHeight - height}px`;
	}

	return contextMenu;
};
