import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const UserClass = controllers.UserClass;
const BookClass = controllers.BookClass;
const StockManagerClass = controllers.StockManagerClass;
const BookCategoryClass = controllers.BookCategoryClass;
const SearchClass = controllers.SearchClass;
const authMiddleware = middlewares.middleware;
const adminMiddleware = middlewares.adminMiddleware;
const router = express.Router();

router.get('/', (req, res) =>
  res.send({ message: 'Hello, welcome to Hello-Books Api version 1' }));

router.post('/users/signup', UserClass.signup);
router.post('/users/signin', UserClass.signin);

router.route('/users/:userId/books')
  .post(authMiddleware, BookClass.borrowBook)
  .get(authMiddleware, BookClass.getBorrowedBook);
router.route('/users/:userId/books/:borrowedBookId')
  .put(authMiddleware, BookClass.returnBorrowedBook);

router.route('/books')
  .post(authMiddleware, BookClass.create)
  .get(authMiddleware, BookClass.get);

router.route('/books/stocks')
  .post(authMiddleware, adminMiddleware, StockManagerClass.create)
  .get(authMiddleware, adminMiddleware, StockManagerClass.get);

router.route('/books/categories')
  .post(authMiddleware, adminMiddleware, BookCategoryClass.add)
  .get(authMiddleware, BookCategoryClass.get);

router.route('/books/:id')
  .get(authMiddleware, authMiddleware, BookClass.get)
  .delete(authMiddleware, adminMiddleware, BookClass.delete);

router.route('/books/:bookId')
  .put(authMiddleware, authMiddleware, BookClass.edit);


router.route('/books/categories/:categoryId')
  .put(authMiddleware, adminMiddleware, BookCategoryClass.update)
  .delete(authMiddleware, adminMiddleware, BookCategoryClass.delete);

router.route('/books/stocks/:stockId')
  .delete(authMiddleware, adminMiddleware, StockManagerClass.delete);

router.route('/search')
  .get(authMiddleware, SearchClass.get);

export default router;
