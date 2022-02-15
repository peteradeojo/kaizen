$(() => {
	const displayItems = (obj) => {
		console.log(obj);
	};

	const loadItems = async () => {
		try {
			const items = await fetch(`${RES_HOST}/api/products`);
			displayItems(await items.json());
		} catch (error) {
			console.error(error);
		}
	};

	(async () => {
		await loadItems();
	})();
});
