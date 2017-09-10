import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

export default (app) => {
  app.use(logger('dev'));
<<<<<<< HEAD
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
=======
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
  app.set('secret', 'aaCaCRaCR}aCR}!aCR}!%aCR}!%^aCR}!%^<aCR}!%^<yaCR}!%^<ys');

  app.use('/api/v1', routes);
};
