import { Router } from 'express';

const router = Router();

const indexRouter = () => {
	router.route('/').get((req, res) => {
		res.render('index');
	});
	return router;
};

export default indexRouter;
