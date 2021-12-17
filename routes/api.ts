import express from 'express';
import mongoose from 'mongoose';
const debug = require('debug')('app:api-route');

const router = express.Router();
import Products from '../models/Catalog';

module.exports = () => {
	router.get('/', async (req, res) => {
		const items = await Products.find();
		res.json({ items });
	});

	router.get('/search', async (req, res) => {
		const items = await Products.find();
		const search = req.query.search as string;
		if (search.length < 1) {
			return res.json({ results: [] });
		}
		const results = items.filter((result: any) => {
			const cats = result.category.filter((cat: any) => cat.indexOf(search.toLowerCase()) > -1);
			return (
				result.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
				cats.length > 0 ||
				(result.collectionName
					? result.collectionName.toLowerCase().indexOf(search.toLowerCase()) > -1
					: false)
			);
		});
		res.json({ results: results.slice(0, 10), search });
	});

	router.get('/info', async (req, res) => {
		const items = await Products.find();
		const { param } = req.query;
		const params = (param as string).split(',');
		// console.log(params);
		const queryItems = (req.query.items as string).split(',');
		let result: any[] = [];
		queryItems.map((item) => {
			let it = items.find((it) => it.id == item);
			if (it) {
				// @ts-ignore
				// console.log(it[params[0]]);
				let obj = {};
				params.forEach((prop) => {
					// @ts-ignore
					obj[prop] = it[prop];
				});
				// @ts-ignore
				result.push(obj);
			}
		});
		res.json(result);
	});

	return router;
};
