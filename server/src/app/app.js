import path from 'path';
import express from 'express';
import logger from 'morgan';
import ejs from 'ejs';
import routes from './routes';

export default (app) => {
  const { renderFile } = ejs;
  app.use(logger('dev'));
  app.use(express.static(path.join(__dirname, '../../../client/build')));
  app.set('views', path.join(__dirname, '../../../client/build'));
  app.engine('.html', renderFile);

  app.use(routes);


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
};
