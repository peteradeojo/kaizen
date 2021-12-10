import express from 'express';

const router = express.Router();

module.exports = () => {
	router.get('/', (req, res) => {
		res.render('cart');
	});

	router.post('/', async (req, res) => {
		console.log(req.body);
		// x: Log cart additions and update statistics
		res.json({ data: req.body, ok: true });
	});

	return router;
};
