import express from 'express';
// import from 'mongoose';
import { Mongoose } from 'mongoose';

const router = express.Router();
import Products from '../models/Catalog';

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

	router.get('/product/:id', async (req, res, next) => {
		const { id } = req.params;
		const item = await Products.findOne({ idValue: id });
		// const item = items.find((item: any) => item.id == id);
		// console.log(item);
		if (!item) {
			return next();
		}
		res.render('store/product', { product: item });
	});

	router.get('/:term', async (req, res) => {
		const { term } = req.params;
		try {
			const items = await Products.find();
			// @ts-ignore
			const resData = items.filter((item: { name: string; category: string[] }) => {
				if (item.name.toLowerCase().includes(term.toLowerCase()) || item.category.includes(term))
					return true;
			});
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
