import path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.use(express.static(path.join(__dirname, '../template/')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '');
app.get('/', (_, res) => { res.render('template'); });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8080);

console.log('Listening at http://localhost:8080');
