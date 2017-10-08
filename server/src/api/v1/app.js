import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';
import { sendSurchargeJob } from './cron';

const { TOKEN_SECRET } = process.env;

export default (app) => {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.set('secret', TOKEN_SECRET);

  sendSurchargeJob();

  app.use('/api/v1', routes);
};
