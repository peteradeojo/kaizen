// @ts-check

document.addEventListener('DOMContentLoaded', () => {
	(async () => {
		try {
			const res = await fetch('/store/catalog?category=tops,bottom');
			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	})();
});
