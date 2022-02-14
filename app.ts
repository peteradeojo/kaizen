import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';

const app = express();

if (app.get('env') !== 'production') {
	dotenv.config();
	app.use(morgan('dev'));
}

app.use(
	session({
		secret: process.env.SECRET as string,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(cookieParser());

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, '/public/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

export default app;
