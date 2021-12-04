import express, { Response, Request, NextFunction } from 'express';
const debug = require('debug')('app');

const server = express();

require('./config/setup')(server);

// Routing
server.use('/', require('./routes/index')());
server.use('/api', require('./routes/api')());
server.use('/store', require('./routes/store')());
server.use('/cart', require('./routes/cart')());

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
	if (err) {
		res.status(500);
		let error: string;

		if (process.env.NODE_ENV == 'production') {
			error = 'An internal server has occured';
		} else {
			error = err;
			debug(err);
		}
		return res.render('500', { error });
	}
	next();
});

server.use((req, res, next) => {
	res.status(404);
	res.render('404');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
	debug(`Server running on port ${port}`);
});
