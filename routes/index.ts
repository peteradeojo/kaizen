import express, { Express, Request, Response, NextFunction } from 'express';

const router = express.Router();

const { loadItems } = require('../midware/functions');
interface Collection {
	id: string | number;
	title: string;
	link?: string;
	img: string;
	story?: string;
}

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
	const { catalog: items }: { catalog: any[] } = loadItems();
	router.get('/', (req, res) => {
		res.render('index', { releases: items.slice(0, 3) });
	});

	return router;
};
