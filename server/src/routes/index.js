import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const userController = controllers.users;
const bookController = controllers.bookController;
const stockController = controllers.stockController;
const authMiddleware = middlewares.middleware;
const userMiddleware = middlewares.userMiddleware;
const adminMiddleware = middlewares.adminMiddleware;
const router = express.Router();

export default (app) => {
  app.get('/', (_, res) => { res.render('index.html'); }); // pipe template/index.html to view
  app.get('/api/', (req, res) => res.status(200).send({ message: 'Welcome to Hello-Books api!' }));

  router.post('/users/signup', userController.signup);
  router.post('/users/signin', userController.signin);

  router.route('/users/:userId/books')
    .post(authMiddleware, userMiddleware, bookController.borrowBook)
    .get(authMiddleware, userMiddleware, bookController.getBorrowedBook)
    .put(authMiddleware, userMiddleware, bookController.returnBorrowedBook);

  router.route('/books')
    .post(authMiddleware, authMiddleware, bookController.create)
    .put(authMiddleware, authMiddleware, bookController.edit)
    .get(authMiddleware, authMiddleware, bookController.get);

  router.route('/books/stocks')
    .post(authMiddleware, adminMiddleware, stockController.create)
    .delete(authMiddleware, adminMiddleware, stockController.delete)
    .get(authMiddleware, adminMiddleware, stockController.get);

  app.use('/api', router);

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
    res.send({ message: res.locals.message, status: 'Not Found', code: err.status });
  });
};
