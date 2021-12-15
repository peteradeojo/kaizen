import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const router = express.Router();
import Products from '../models/Catalog';

module.exports = (app: Express) => {
	router.get('/', async (req, res) => {
		const items = await Products.find();
		res.render('index', { releases: items.slice(0, 3), latest: items.slice(-5) });
	});
	return router;
};
