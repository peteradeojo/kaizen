import express from 'express';

const router = express.Router();

module.exports = () => {
	router.get('/', (req, res) => {
		res.render('cart');
	});

	return router;
};
