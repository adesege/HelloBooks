'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _middlewares = require('../middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userController = _controllers2.default.users;
var bookController = _controllers2.default.bookController;
var stockController = _controllers2.default.stockController;
var authMiddleware = _middlewares2.default.middleware;
var userMiddleware = _middlewares2.default.userMiddleware;
var adminMiddleware = _middlewares2.default.adminMiddleware;
var router = _express2.default.Router();

exports.default = function (app) {
  app.get('/', function (_, res) {
    res.render('index.html');
  }); // pipe template/index.html to view
  app.get('/api/', function (req, res) {
    return res.status(200).send({ message: 'Welcome to Hello-Books api!' });
  });

  router.post('/users/signup', userController.signup);
  router.post('/users/signin', userController.signin);

  router.route('/users/:userId/books').post(authMiddleware, userMiddleware, bookController.borrowBook).get(authMiddleware, userMiddleware, bookController.getBorrowedBook).put(authMiddleware, userMiddleware, bookController.returnBorrowedBook);

  router.route('/books').post(authMiddleware, authMiddleware, bookController.create).put(authMiddleware, authMiddleware, bookController.edit).get(authMiddleware, authMiddleware, bookController.get);

  router.route('/books/stocks').post(authMiddleware, adminMiddleware, stockController.create).delete(authMiddleware, adminMiddleware, stockController.delete).get(authMiddleware, adminMiddleware, stockController.get);

  app.use('/api', router);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send({ message: res.locals.message, status: 'Not Found', code: err.status });
  });
};