export const getConfig = () => {
	return fetch('http://localhost:5173/config.json')
		.then((response) => response.json())
		.then((data) => data);
};
