import express from 'express';

const router = express.Router();

const categories = ['shirts', 'tops'];

module.exports = () => {
	router.get('/', (req, res) => {
		if (req.query.search) {
			return res.json(req.query);
		}
		res.render('store/index', { title: 'Browse' });
	});

	router.use((req, res) => {
		res.status(404).render('store/404');
	});

	return router;
};
