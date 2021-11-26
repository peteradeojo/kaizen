// @ts-check

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.slider').forEach((slideshow) => {
		// console.log(slideshow);
		let slideIndex = 1;

		const showSlides = (n) => {
			let i;
			const slides = slideshow.querySelectorAll('.slide');
			if (n > slides.length) slideIndex = 1;
			if (n < 1) slideIndex = slides.length;

			for (i = 0; i < slides.length; i++) {
				slides[i].style.display = 'none';
			}

			slides[slideIndex - 1].style.display = 'initial';
		};

		showSlides(slideIndex);
		const nextButton = slideshow.querySelector('button.next');
		const prevButton = slideshow.querySelector('button.previous');
		let index = 0;

		nextButton.addEventListener('click', () => {
			showSlides(slideIndex += 1);
		});
		prevButton.addEventListener('click', () => {
			showSlides(slideIndex -= 1);
		});
	});
});
