import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

export default (app) => {
  app.use(logger('dev'));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.set('secret', 'aaCaCRaCR}aCR}!aCR}!%aCR}!%^aCR}!%^<aCR}!%^<yaCR}!%^<ys');

  app.use('/api/v1', routes);
};
