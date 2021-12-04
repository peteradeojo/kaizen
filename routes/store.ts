import express from 'express';
import { readFileSync, readFile } from 'fs';
import path from 'path';

const router = express.Router();

// const categories = ['shirts', 'tops'];

const { loadItems } = require('../midware/functions');
import Category from '../models/categories';

module.exports = () => {
	router.get('/', async (req, res) => {
		const categories = await Category.find();
		if (req.query.search) {
			return res.json(req.query);
		}
		res.render('store/index', { title: 'Browse', categories });
	});
	router.get('/catalog', (req, res) => {
		res.json(req.query);
	});

	router.get('/product/:id', (req, res, next) => {
		const { id } = req.params;
		const { catalog: items }: { catalog: any[] } = loadItems();
		const item = items.find((item) => item.id == id);
		if (!item) {
			return next();
		}
		res.render('store/product', { product: item });
	});

	router.get('/:term', async (req, res) => {
		const { term } = req.params;
		try {
			const { catalog: items }: { catalog: any[] } = loadItems();
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
