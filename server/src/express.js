import express from 'express';
import fs from 'fs';
import path from 'path';
import dotEnv from 'dotenv';
import App from './app/app';
// import Docs from './docs';

dotEnv.config();

const app = express();

app.get('/api/', (req, res) => res.status(200).send({ message: 'Welcome to Hello-Books api!' }));

app.use((req, res, next) => {
  // const docsPath = req.url.match(/\/(docs)/) || [];
  let version = req.url.match(/\/api\/(v[0-9]+)[a-z0-9/_+-]*/) || [];
  version = version[1] || '';
  if (version !== '') {
    const appPath = path.join(__dirname, `./api/${version}/app.js`);
    if (!fs.existsSync(appPath)) {
      return res.status(404).send({ message: 'It\'s not us. Sorry, we can\'t find this endpoint' });
    }
    const routes = require(appPath); // eslint-disable-line global-require, import/no-dynamic-require, max-len
    console.log(routes);
    routes.default(app);
  } else {
    App(app);
  }
  // else if (docsPath[0] !== '') {
  //   Docs(app);
  // } 

  next();
});

export default app;

