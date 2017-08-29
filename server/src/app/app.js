import path from 'path';
import express from 'express';
import logger from 'morgan';
import ejs from 'ejs';
import routes from './routes';

export default (app) => {
  const renderFile = ejs.renderFile;
  app.use(logger('dev'));
<<<<<<< HEAD
  app.use(express.static(path.join(__dirname, '../../../client/build')));
  app.set('views', path.join(__dirname, '../../../client/build'));
=======
  app.use(express.static(path.join(__dirname, '../../../template/assets/')));
  app.set('views', path.join(__dirname, '../../../template'));
>>>>>>> 57180ba44b666f56ac38e6d5cb85e1cb5613caed
  app.engine('.html', renderFile);

  app.use(routes);
};
