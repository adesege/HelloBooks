import path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const renderFile = ejs.renderFile;
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../template/assets/')));
app.set('views', path.join(__dirname, '../../template'));
app.engine('.html', renderFile);
app.set('secret', 'aaCaCRaCR}aCR}!aCR}!%aCR}!%^aCR}!%^<aCR}!%^<yaCR}!%^<ys');

routes(app);

export default app;
