import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

export default (app) => {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.set('secret', 'aaCaCRaCR}aCR}!aCR}!%aCR}!%^aCR}!%^<aCR}!%^<yaCR}!%^<ys');

  app.use('/api/v1', routes);
};
