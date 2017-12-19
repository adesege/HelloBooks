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
  .put(authMiddleware, UserController.editUser);

router.route('/books')
  .get(authMiddleware, BookController.getBooks)
  .post(authMiddleware, BookController.addBook);

router.route('/notifications')
  .get(authMiddleware, adminMiddleware, NotificationController.getNotifications);

router.route('/books/stocks')
  .post(authMiddleware, adminMiddleware, StockManagerController.addStock)
  .get(authMiddleware, adminMiddleware, StockManagerController.getStocks);

router.route('/books/categories')
  .post(authMiddleware, adminMiddleware, BookCategoryController.addCategory)
  .get(authMiddleware, BookCategoryController.getCategories);

router.route('/books/histories/:userId')
  .get(authMiddleware, BookController.getHistories);

router.route('/books/:id')
  .get(authMiddleware, authMiddleware, BookController.getBooks)
  .delete(authMiddleware, adminMiddleware, BookController.deleteBook);

router.route('/books/:bookId')
  .put(authMiddleware, authMiddleware, BookController.editBooks);

router.route('/books/categories/:categoryId')
  .put(authMiddleware, adminMiddleware, BookCategoryController.editCategory)
  .delete(authMiddleware, adminMiddleware, BookCategoryController.deleteCategory);

router.route('/books/stocks/:stockId')
  .delete(authMiddleware, adminMiddleware, StockManagerController.deleteStock);

router.route('/search')
  .get(authMiddleware, SearchController.getResult);

export default router;
