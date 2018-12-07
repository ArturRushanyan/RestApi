import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import config from './config';
import routes from './routes/index';
import cors from 'cors';

const app = express();
const whitelist = ['http://localhost:3000', 'http://localhost:4200']
app.use(cors({ origin: whitelist }));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.Db.url, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Successfully connected to the database');
}).catch(() => {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

routes(app);

app.listen(config.port, () => {
  console.log('Server is up!');
});
