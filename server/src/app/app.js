import path from 'path';
import logger from 'morgan';
import ejs from 'ejs';
import expressStaticGzip from 'express-static-gzip';
import routes from './routes';

/**
 * Exports a function
 * so we can pass an instance of express as reference for use here
 *
 * @returns {undefined}
 *
 * @param {object} app - instance of express
*/
export default (app) => {
  const { renderFile } = ejs;
  app.use(logger('dev'));
  app.use(expressStaticGzip(path.join(__dirname, '../../../client/build')));
  app.set('views', path.join(__dirname, '../../../client/build'));
  app.engine('.html', renderFile);

  app.use(routes);
};
