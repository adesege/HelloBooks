import express from 'express';
import dotEnv from 'dotenv';
import path from 'path';
import ejs from 'ejs';
import clientRoutes from './app/app';
import apiRoutes from './api/v1/app';

/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';
/* istanbul ignore if */
if (env === 'development') {
  dotEnv.config();
}

const app = express();
const { renderFile } = ejs;

app.use('/docs/v1', express.static(path.join(__dirname, './docs/v1')));
app.set('views', path.join(__dirname, './docs/v1'));
app.engine('.html', renderFile);

app
  .get(
    '/api/',
    (req, res) =>
      res
        .status(200)
        .send({ message: ['Welcome to Hello-Books api!'] })
  );


apiRoutes(app);
clientRoutes(app);

export default app;

