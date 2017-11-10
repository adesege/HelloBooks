import express from 'express';
import path from 'path';
import dotEnv from 'dotenv';
import expressApiVersioning from 'express-api-versioning';
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

app.use(expressApiVersioning({
  apiPath: path.join(__dirname, './api'), // absolute path to the api directory
  test: /\/api\/(v[0-9]+).*/, // regular expression to get the version number from the url
  entryPoint: 'app.js', // entry point exports a function which takes an instance of express as parameter.
  instance: app // passes an instance of express to the entry point
}, (error, req, res, next) => {
  if (error && error.code === 104) {
    App(app);
  } else if (error && error.code !== 104) {
    return res.status(404).send({
      message: 'It\'s not us. Sorry, we can\'t find this endpoint'
    });
  }
  next(); // calls the next middleware
}));

export default app;

