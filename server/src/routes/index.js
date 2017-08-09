import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/authenticate';

const userController = controllers.users;
const bookController = controllers.bookController;
const stockController = controllers.stockController;
const router = express.Router();

export default (app) => {
  app.get('/', (_, res) => { res.render('template'); });

  router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to Hello-Books api. !',
  }));

  router.post('/users/signup', userController.signup);
  router.post('/users/signin', userController.signin);

  router.route('/users/:userId/books')
    .post(authMiddleware, bookController.borrowBook)
    .get(authMiddleware, bookController.getBorrowBook)
    .put(authMiddleware, bookController.returnBorrowedBook);

  router.route('/books')
    .post(authMiddleware, bookController.create)
    .put(authMiddleware, bookController.edit)
    .get(authMiddleware, bookController.get);

  router.route('/books/stocks')
    .post(authMiddleware, stockController.create)
    .delete(authMiddleware, stockController.delete)
    .get(authMiddleware, stockController.get);

  app.use('/api', router);
};
