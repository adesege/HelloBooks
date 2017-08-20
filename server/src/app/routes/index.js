import express from 'express';

const router = express.Router();

router.get('/', (_, res) => { res.render('index.html'); }); // pipe template/index.html to view

// catch 404 and forward to error handler
router.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
router.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send({ message: res.locals.message, status: 'Not Found', code: err.status });
});

export default router;
