import app from './app';
import { Request, Response, NextFunction } from 'express';
import Debug from 'debug';
import indexRouter from './routes';
const debug = Debug('app:index');

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
	res.locals.RES_HOST = process.env.RES_HOST || 'http://localhost:4041';
	next();
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	if (err) {
		return res.status(500).send(err);
	}
	next();
});
app.use('/', indexRouter());

app.listen(port, () => debug(`Server running on port ${port}`));
