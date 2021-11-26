// @ts-check

document.addEventListener('DOMContentLoaded', () => {
	const gallery = document.querySelector('.gallery');
	gallery.querySelector('button.next').addEventListener('click', (e) => {
		gallery.querySelector('.scroller').scrollBy({
			left: 200,
		});
	});
	gallery.querySelector('button.previous').addEventListener('click', (e) => {
		gallery.querySelector('.scroller').scrollBy({
			left: -200,
		});
	});
});
