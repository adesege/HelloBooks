import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const {
  UserController,
  BookController,
  StockManagerController,
  BookCategoryController,
  SearchController,
  NotificationController
} = controllers;
const {
  authMiddleware,
  adminMiddleware
} = middlewares;

const router = express.Router();

router.get('/', (req, res) =>
  res
    .send({
      message: 'Hello, welcome to Hello-Books Api version 1'
    }));

router.post('/users/signup', UserController.signup);
router.post('/users/signin', UserController.signin);

router.post('/users/reset-password', UserController.sendResetPasswordMail);
router.post('/users/reset-password/verify', UserController.resetPassword);

router.route('/users/:userId/books')
  .post(authMiddleware, BookController.borrowBook)
  .get(authMiddleware, BookController.getBorrowedBook);

router.route('/users/:userId/books/:borrowedBookId')
  .put(authMiddleware, BookController.returnBorrowedBook);

router.route('/users')
  .get(authMiddleware, UserController.getUsers);

router.route('/users/:userId')
  .get(authMiddleware, UserController.getUsers)
  .put(authMiddleware, UserController.updateUser);

router.route('/books')
  .get(authMiddleware, BookController.get)
  .post(authMiddleware, BookController.create);

router.route('/notifications')
  .get(authMiddleware, adminMiddleware, NotificationController.get);

router.route('/books/stocks')
  .post(authMiddleware, adminMiddleware, StockManagerController.create)
  .get(authMiddleware, adminMiddleware, StockManagerController.get);

router.route('/books/categories')
  .post(authMiddleware, adminMiddleware, BookCategoryController.add)
  .get(authMiddleware, BookCategoryController.get);

router.route('/books/histories/:userId')
  .get(authMiddleware, BookController.getHistories);

router.route('/books/:id')
  .get(authMiddleware, authMiddleware, BookController.get)
  .delete(authMiddleware, adminMiddleware, BookController.delete);

router.route('/books/:bookId')
  .put(authMiddleware, authMiddleware, BookController.edit);

router.route('/books/categories/:categoryId')
  .put(authMiddleware, adminMiddleware, BookCategoryController.update)
  .delete(authMiddleware, adminMiddleware, BookCategoryController.delete);

router.route('/books/stocks/:stockId')
  .delete(authMiddleware, adminMiddleware, StockManagerController.delete);

router.route('/search')
  .get(authMiddleware, SearchController.get);

export default router;
