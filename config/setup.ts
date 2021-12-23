import express, { Express } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
const debug = require('debug')('app:setup');

module.exports = (app: Express) => {
	// console.log('Bebe');
	if (process.env.NODE_ENV !== 'production') {
		app.use(require('morgan')('dev'));
		require('dotenv').config();
	}

	app.use(cors());

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(
		session({
			secret: process.env.SECRET!,
			resave: false,
			saveUninitialized: false,
		})
	);

	app.set('view engine', 'pug');
	app.set('views', path.resolve(__dirname, '../views'));

	app.use(express.static(path.resolve(__dirname, '../public')));

	(async () => {
		try {
			const { connection: cxn } = await mongoose.connect(process.env.MONGO_URI!);
			debug(`MongoDB Connected on ${cxn.host}:${cxn.port}`);
		} catch (err) {
			debug(err);
		}
	})();
};
