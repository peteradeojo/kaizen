import express from 'express';
const debug = require('debug')('app:api-route');

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
		const allRes = [
			{
				name: 't-shirt',
				link: '/store/t-shirt',
				category: ['shirt', 'top'],
				collection: 'pilot',
			},
			{
				name: 't-top',
				link: '/store/t-top',
				category: ['shirt', 'top'],
				collection: 'pilot',
			},
			{
				name: 'Bucket Hat',
				link: '/store/bucket-hat',
				category: ['hat', 'bucket-hat'],
				collection: 'pilot',
			},
			{
				name: 'Bucket Hat',
				link: '/store/bucket-hat',
				category: ['hat', 'bucket-hat'],
				collection: 'pilot',
			},
			{
				name: 'Bucket Hat',
				link: '/store/bucket-hat',
				category: ['hat', 'bucket-hat'],
				collection: 'pilot',
			},
			{
				name: 'Bucket Hat',
				link: '/store/bucket-hat',
				category: ['hat', 'bucket-hat'],
				collection: 'pilot',
			},
			{
				name: 'Bucket Hat',
				link: '/store/bucket-hat',
				category: ['hat', 'bucket-hat'],
				collection: 'pilot',
			},
			{
				name: 'Bucket Hat',
				link: '/store/bucket-hat',
				category: ['hat', 'bucket-hat'],
				collection: 'pilot',
			},
		];
		console.log(search.toLowerCase());
		const results = allRes.filter((result) => {
			const cats = result.category.filter(
				(cat) => cat.indexOf(search.toLowerCase()) > -1
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
