import express from 'express';
const debug = require('debug')('app:api-route');

const router = express.Router();

const { loadItems } = require('../midware/functions');

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
		img: '/compressed/img_8620.jpg',
		title: 'Changes',
		info: '\u20a65,200',
		name: 'change-t-shirt',
	},
	{
		id: 2,
		img: '/compressed/IMG_2673ret-min.jpg',
		title: 'Home',
		info: '\u20a63,600',
		name: 'change-t-shirt',
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

module.exports = () => {
	router.get('/', (req, res) => {
		res.json({ releases, collections });
	});

	router.get('/search', (req, res) => {
		const search = req.query.search as string;
		if (search.length < 1) {
			return res.json({ results: [] });
		}
		const { items } = loadItems();
		console.log(items);
		console.log(search.toLowerCase());
		const results = items.filter((result: any) => {
			const cats = result.category.filter(
				(cat: any) => cat.indexOf(search.toLowerCase()) > -1
			);
			return (
				result.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
				cats.length > 0 ||
				result.collection.toLowerCase().indexOf(search.toLowerCase()) > -1
			);
		});
		res.json({ results: results.slice(0, 5), search });
	});

	return router;
};
