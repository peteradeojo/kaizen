$(() => {
	// console.log(RES_HOST);
	const displayItems = (obj) => {
		console.log(obj);
	};

	const loadItems = async () => {
		try {
			const items = await fetch(`${RES_HOST}/products`);
			displayItems(await items.json());
		} catch (error) {
			console.error(error);
		}
	};

	(async () => {
		await loadItems();
	})();
});
