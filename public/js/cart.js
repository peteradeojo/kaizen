document.addEventListener('DOMContentLoaded', () => {
	const addToCart = (product) => {
		
	};
	const CART_BTN = document.querySelector('#add-to-cart-btn');
	const CART_ICON = document.querySelector('#cart-link-icon');

	{
		document.querySelector('#cart-form')
			? document
					.querySelector('#cart-form')
					.addEventListener('submit', async (e) => {
						e.preventDefault();
						const cartFormData = new FormData(
							document.querySelector('#cart-form')
						);
						try {
							alert(
								'Here is where we add to cart and log some data to the database for statistacs'
							);
						} catch (err) {
							console.error(err);
						}
					})
			: null;
	}
});
