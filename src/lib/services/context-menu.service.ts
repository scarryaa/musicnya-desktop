interface ContextMenuItem {
	text?: string;
	icon: string;
	action: () => void;
}

interface ContextMenuOptions {
	topItems?: ContextMenuItem[];
	items: ContextMenuItem[];
	target: HTMLElement;
	x: number;
	y: number;
}

export const createContextMenu = (options: ContextMenuOptions) => {
	const { topItems = [], items, target } = options;
	const contextMenu = document.createElement('div');
	contextMenu.classList.add('context-menu');
	contextMenu.style.left = `${options.x}px`;
	contextMenu.style.top = `${options.y}px`;
	contextMenu.style.border = '1px solid black';

	// add flex row
	const flexRow = document.createElement('div');
	flexRow.classList.add('flex-row');

	// add flex column
	const flexColumn = document.createElement('div');

	//add menu items and icons
	topItems.forEach((item) => {
		const menuItem = document.createElement('div');
		menuItem.classList.add('menu-item');
		menuItem.style.marginRight = '10px';

		menuItem.innerHTML = `
				<i class="fa-regular fa-${item.icon}" title="${item.text}"></i>
			`;
		menuItem.addEventListener('click', () => {
			contextMenu.remove();
			item.action();
		});
		flexRow.appendChild(menuItem);
	});

	items.forEach((item) => {
		const menuItem = document.createElement('div');
		menuItem.classList.add('menu-item');

		menuItem.innerHTML = `
				<i class="menu-item-icon fa-solid fa-${item.icon}"></i>
				<span class="menu-item-text">${item.text || ''}</span>
			`;
		menuItem.addEventListener('click', () => {
			contextMenu.remove();
			item.action();
		});
		flexColumn.appendChild(menuItem);
	});

	contextMenu.appendChild(flexRow);
	contextMenu.appendChild(flexColumn);
	document.body.appendChild(contextMenu);

	window.onmousedown = (e) => {
		if (!contextMenu.contains(e.target as Node)) {
			contextMenu.remove();
			// disable scrolling when context menu is open
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
