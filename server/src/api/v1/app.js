import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

const { TOKEN_SECRET } = process.env;

/**
 * Exports a function
 * so we can pass an instance of express as reference for use here
 *
 * @returns {undefined}
 *
 * @param {object} app - instance of express
*/
export default (app) => {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.set('secret', TOKEN_SECRET);

  app.use('/api/v1', routes);
};
