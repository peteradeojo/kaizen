import express, { Express, Request, Response, NextFunction } from 'express';

const router = express.Router();

interface Release {
	id: string | number;
	img: string;
	title: string;
	info: string;
	name: string;
}
interface Collection {
	id: string | number;
	title: string;
	link?: string;
	img: string;
	story?: string;
}

const releases: Release[] = [
	{
		id: 1,
		img: '/compressed/IMG_2753-min-removebg-preview.png',
		title: 'Changes',
		info: '\u20a65,200',
		name: 'change-t-shirt',
	},
	{
		id: 2,
		img: '/compressed/IMG_2686retouched-removebg.png',
		title: 'Home',
		info: '\u20a63,600',
		name: 'change-t-shirt',
	},
	{
		id: 3,
		img: '/compressed/IMG_2673ret-min-removebg.png',
		title: 'Solstice',
		info: '\u20a64,000',
		name: 'Olympus',
	},
];

const collections: Collection[] = [
	{
		id: 1,
		title: 'Pilot',
		img: 'pilot-bg.png',
		story:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illo blanditiis recusandae suscipit soluta placeat ullam consectetur dicta officiis repellat, cupiditate, eveniet laborum quos ratione itaque fuga aliquam, autem atque?',
	},
	{
		id: 2,
		title: 'Pilot',
		img: 'pilot-bg.png',
		story:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illo blanditiis recusandae suscipit soluta placeat ullam consectetur dicta officiis repellat, cupiditate, eveniet laborum quos ratione itaque fuga aliquam, autem atque?',
	},
	{
		id: 3,
		title: 'Pilot',
		img: 'pilot-bg.png',
		story:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illo blanditiis recusandae suscipit soluta placeat ullam consectetur dicta officiis repellat, cupiditate, eveniet laborum quos ratione itaque fuga aliquam, autem atque?',
	},
];

module.exports = (app: Express) => {
	router.get('/', (req, res) => {
		res.render('index', { releases, collections });
	});

	return router;
};
