import express from 'express';
import fs from 'fs';
import path from 'path';
import dotEnv from 'dotenv';
import App from './app/app';

/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';
/* istanbul ignore if */
if (env === 'development') {
  dotEnv.config();
}

const app = express();

app
  .get(
    '/api/',
    (req, res) =>
      res
        .status(200)
        .send({ message: 'Welcome to Hello-Books api!' })
  );

app.use((req, res, next) => {
  let version = req.url.match(/\/api\/(v[0-9]+)[a-z0-9/_+-]*/) || [];
  version = version[1] || '';
  if (version !== '') {
    const appPath = path.join(__dirname, `./api/${version}/app.js`);
    if (!fs.existsSync(appPath)) {
      return res.status(404).send({
        message: 'It\'s not us. Sorry, we can\'t find this endpoint'
      });
    }
    /* eslint-disable global-require, import/no-dynamic-require */
    const routes = require(appPath);
    routes.default(app);
  } else {
    App(app);
  }
  next();
});

export default app;

