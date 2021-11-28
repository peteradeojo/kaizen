import express from 'express';
import { readFileSync, readFile } from 'fs';
import path from 'path';

const router = express.Router();

const categories = ['shirts', 'tops'];

const loadItems = () => {
	try {
		const data = readFileSync(path.resolve('./routes/data.json'), {
			encoding: 'utf-8',
		});
		return JSON.parse(data);
	} catch (err) {
		console.log(err);
		return [];
	}
};

module.exports = () => {
	router.get('/', (req, res) => {
		if (req.query.search) {
			return res.json(req.query);
		}
		res.render('store/index', { title: 'Browse' });
	});

	router.get('/product/:id', (req, res) => {
		res.render('store/product', {});
	});

	router.get('/:term', async (req, res) => {
		const { term } = req.params;
		try {
			const { items } = loadItems();
			const resData = items.filter(
				(item: { name: string; category: string[] }) => {
					if (
						item.name.toLowerCase().includes(term.toLowerCase()) ||
						item.category.includes(term)
					)
						return true;
				}
			);
			res.json(resData);
		} catch (err) {
			console.log(err);
		}
	});

	router.use((req, res) => {
		res.status(404).render('store/404');
	});

	return router;
};
