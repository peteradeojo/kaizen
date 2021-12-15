// @ts-check
const lskTheme = 'prefer-theme';

!localStorage.getItem(lskTheme)
	? localStorage.setItem(lskTheme, 'light')
	: null;

const toggleTheme = () => {
	localStorage.getItem(lskTheme) == 'light'
		? localStorage.setItem(lskTheme, 'dark')
		: localStorage.setItem(lskTheme, 'light');
};

const updateDocTheme = () => {
	document.body.setAttribute('data-theme', localStorage.getItem(lskTheme));
};

document.addEventListener('DOMContentLoaded', () => {
	// Functions
	// search database for search query
	const resultDOMOutput = document.querySelector('#list-search-results');
	const performSearch = async (val) => {
		const res = await fetch(`/api/search?search=${val}`);
		const data = await res.json();
		return data;
	};
	const renderSearches = ({ results }) => {
		let list = '';
		if (!results) {
			return undefined;
		}
		results.forEach((result) => {
			let li = `<li><a href='${result.link}'>${result.name}</a></li>`;
			list += li;
		});
		resultDOMOutput.innerHTML = list;
	};

	document.body.setAttribute('data-theme', localStorage.getItem(lskTheme));
	document.querySelector('.theme-toggler').addEventListener('click', (e) => {
		e.preventDefault();
		toggleTheme();
		updateDocTheme();
	});

	(() => {
		const navTogglers = document.querySelectorAll('.navbar-toggler');
		// console.log(navTogglers);
		navTogglers.forEach((toggler) => {
			const target = document.querySelector(
				toggler.getAttribute('data-target')
			);
			const toggleOption = toggler.getAttribute('data-toggle');
			toggler.addEventListener('click', () => {
				// console.log(target.classList.remove);
				if (target.classList.contains(toggleOption)) {
					target.classList.remove(toggleOption);
				} else {
					target.classList.add(toggleOption);
				}
			});
		});
	})();

	// Search bar
	if (document.querySelector('.search-bar input#search')) {
		document
			.querySelector('.search-bar input#search')
			.addEventListener('keyup', async (e) => {
				const that = e.target;
				// @ts-ignore
				if (that.value.length >= 2) {
					// @ts-ignore
					renderSearches(await performSearch(that.value));
				} else {
					resultDOMOutput.innerHTML = '';
				}
			});
		document
			.querySelector('.search-bar input#search')
			.addEventListener('focus', async (e) => {
				const that = e.target;
				// @ts-ignore
				if (that.value.length >= 3) {
					// @ts-ignore
					renderSearches(await performSearch(that.value));
				}
			});

		window.addEventListener('click', (e) => {
			// @ts-ignore
			if (e.composedPath()[1].tagName !== 'FORM') {
				resultDOMOutput.innerHTML = '';
			}
		});
	}
});
