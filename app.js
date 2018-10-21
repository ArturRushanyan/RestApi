
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import config from './config';
import routes from './routes/index';

const app = express();
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
