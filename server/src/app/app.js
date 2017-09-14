import path from 'path';
import express from 'express';
import logger from 'morgan';
import ejs from 'ejs';
import routes from './routes';

export default (app) => {
  const renderFile = ejs.renderFile;
  app.use(logger('dev'));
  app.use(express.static(path.join(__dirname, '../../../client/build')));
  app.set('views', path.join(__dirname, '../../../client/build'));
  app.engine('.html', renderFile);

  app.use(routes);
};
