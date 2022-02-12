import app from './app';
import Debug from 'debug';
import indexRouter from './routes';
const debug = Debug('app:index');

const port = process.env.PORT || 5000;

app.use('/', indexRouter());

app.listen(port, () => debug(`Server running on port ${port}`));
