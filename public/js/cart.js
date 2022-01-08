// @ts-check

document.addEventListener('DOMContentLoaded', () => {
	const CART_STORAGE = 'cart';
	const CART_BTN = document.querySelector('#add-to-cart-btn');
	const CART_ICON = document.querySelector('#cart-link-icon');

	const addToCart = (
		/** @type {{ quantity: number; item: any; color: string; size: string; }} */ data
	) => {
		/** @type {{ quantity: number; item: any; color: string; size: string; }[]} */
		const cartData = JSON.parse(localStorage.getItem(CART_STORAGE));

		//* if no item in cart, create
		if (!cartData) {
			localStorage.setItem(CART_STORAGE, JSON.stringify([data]));
			return alert('This item is now in your cart');
		}

		//* Check if item already exists in cart based on color, size, and id
		const checker = cartData.find((item) => {
			if (item.item == data.item && item.color == data.color && item.size == data.size) {
				return true;
			}
		});
		// if exists abort
		if (checker) {
			return alert('This item is already in your cart');
		}

		// add item to cart data and save to localstorage
		const newData = [...cartData, data];
		localStorage.setItem(CART_STORAGE, JSON.stringify(newData));
		return alert('Added item to cart');
	};
	const loadCart = () => {
		return new Promise((resolve, reject) => {
			const CART_LIST = document.querySelector('#cart-list');
			/** @type {{quantity: number, name: string, item: any, size: string, color: string }[]} */
			const cartData = JSON.parse(localStorage.getItem(CART_STORAGE));
			cartData.map((item, index) => {
				let block = document.createElement('div');
				block.classList.add('cart');
				block.setAttribute('item-id', `${index}`);
				block.innerHTML = `<div>
					<p class='title '>${item.name}</p>
					<p class='color'>Color: ${item.color}</p>
					<p class='size'>Size: ${item.size.toUpperCase()}</p>
				</div>
				<div>
					<p class='qty'>Quantity: <button>&minus;</button><span>${
						item.quantity
					}</span> <button>&plus;</button></p>
					<p class='amount'>Price: \u20a6 <span></span></p>
				</div>
				`;
				CART_LIST.appendChild(block);
			});
			resolve(cartData);
		});
	};

	const updateCartItemQuantity = (
		/**@type number */ index,
		/**@type number */ quantity,
		/**@type Element */ display
	) => {
		/**@type {{quantity: number, name: string}[]} */
		const cartData = JSON.parse(localStorage.getItem(CART_STORAGE));

		if (quantity < 0) {
			if (cartData[index].quantity) {
				cartData[index].quantity += quantity;
			}
		} else {
			cartData[index].quantity += quantity;
		}
		display.querySelector('.qty span').innerHTML = `${cartData[index].quantity}`;
		display.querySelector('.amount span').innerHTML = `${
			// @ts-ignore
			cartData[index].quantity * display.querySelector('.amount span').getAttribute('data-price')
		}`;
		// console.log(cartData);
		return localStorage.setItem(CART_STORAGE, JSON.stringify(cartData));
	};

	const configureCartItems = (/** @type any[] */ info) => {
		const carts = document.querySelectorAll('.cart');
		carts.forEach(async (cartBox, index) => {
			const plusButton = cartBox.querySelectorAll('button')[1];
			const minusButton = cartBox.querySelectorAll('button')[0];
			const qtyDisplay = cartBox.querySelector('.qty span');

			plusButton.addEventListener('click', () => updateCartItemQuantity(index, 1, cartBox));

			minusButton.addEventListener('click', () => updateCartItemQuantity(index, -1, cartBox));
			if (info) {
				cartBox.querySelector('.amount span').innerHTML = `${
					// @ts-ignore
					info[index].price * qtyDisplay.innerHTML
				}`;
				cartBox.querySelector('.amount span').setAttribute('data-price', `${info[index].price}`);
			}
		});
	};

	const fetchItemPrice = async (/** @type Array<{name: string, item: string}> */ data) => {
		const list = data.map((it) => it.item);
		// console.log(list);
		try {
			const req = await fetch(`/api/info?param=price,link&items=${list.join(',')}`);
			const res = await req.json();
			// console.log(res);
			return res;
		} catch (err) {
			console.error(err);
		}
	};

	// If there is a cart form on the page do the following
	document.querySelector('#cart-form')
		? document.querySelector('#cart-form').addEventListener('submit', async (e) => {
				e.preventDefault();
				/**@type HTMLFormElement */
				const CART_FORM = document.querySelector('#cart-form');
				const cartFormData = {};
				// @ts-ignore
				cartFormData.name = CART_FORM.name.value;
				cartFormData.item = CART_FORM.item.value;
				cartFormData.color = CART_FORM.color.value;
				cartFormData.size = CART_FORM.size.value;
				try {
					const req = await fetch('/cart', {
						method: 'POST',
						body: JSON.stringify(cartFormData),
						headers: {
							Accept: 'application/json',
							'content-type': 'application/json',
						},
					});
					const res = await req.json();
					if (res.ok) {
						addToCart({ ...cartFormData, quantity: 1 });
					}
				} catch (err) {
					console.error(err);
				}
		  })
		: null;

	document.querySelector('#cart-list')
		? loadCart().then(async (data) => {
				const result = await fetchItemPrice(data);
				configureCartItems(result);
		  })
		: null;
});
