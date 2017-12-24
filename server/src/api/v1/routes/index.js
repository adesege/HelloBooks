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

const routes = express.Router();

routes
  .get('/', (req, res) =>
    res
      .send({
        message: 'Hello, welcome to Hello-Books Api version 1'
      }));

routes
  .post('/users/signup', UserController.signup);
routes
  .post('/users/signin', UserController.signin);

routes
  .post('/users/reset-password', UserController.sendResetPasswordMail);
routes
  .post('/users/reset-password/verify', UserController.resetPassword);

routes
  .route('/users/:userId/books')
  .post(authMiddleware, BookController.borrowBook)
  .get(authMiddleware, BookController.getBorrowedBook);

routes
  .route('/users/:userId/books/:borrowedBookId')
  .put(authMiddleware, BookController.returnBorrowedBook);

routes
  .route('/users')
  .get(authMiddleware, UserController.getUsers);

routes
  .route('/users/:userId')
  .get(authMiddleware, UserController.getUsers)
  .put(authMiddleware, UserController.editUser);

routes
  .route('/books')
  .get(authMiddleware, BookController.getBooks)
  .post(authMiddleware, BookController.addBook);

routes
  .route('/notifications')
  .get(
    authMiddleware,
    adminMiddleware,
    NotificationController.getNotifications
  );

routes
  .route('/books/stocks')
  .post(authMiddleware, adminMiddleware, StockManagerController.addStock)
  .get(authMiddleware, adminMiddleware, StockManagerController.getStocks);

routes
  .route('/books/categories')
  .post(authMiddleware, adminMiddleware, BookCategoryController.addCategory)
  .get(authMiddleware, BookCategoryController.getCategories);

routes
  .route('/books/histories/:userId')
  .get(authMiddleware, BookController.getHistories);

routes
  .route('/books/:id')
  .get(authMiddleware, authMiddleware, BookController.getBooks)
  .delete(authMiddleware, adminMiddleware, BookController.deleteBook);

routes
  .route('/books/:bookId')
  .put(authMiddleware, authMiddleware, BookController.editBooks);

routes
  .route('/books/categories/:categoryId')
  .put(authMiddleware, adminMiddleware, BookCategoryController.editCategory)
  .delete(
    authMiddleware,
    adminMiddleware,
    BookCategoryController.deleteCategory
  );

routes
  .route('/books/stocks/:stockId')
  .delete(
    authMiddleware,
    adminMiddleware,
    StockManagerController.deleteStock
  );

routes
  .route('/search')
  .get(authMiddleware, SearchController.getResult);

export default routes;
