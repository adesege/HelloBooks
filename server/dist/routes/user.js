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
var authMiddleware = _middlewares2.default.authenticate;
var userMiddleware = _middlewares2.default.userAuthenticate;
var router = _express2.default.Router();
var userRouter = _express2.default.Router();

exports.default = function (app) {

  userRouter.use(authMiddleware);
  userRouter.use(userMiddleware);
  userRouter.post(bookController.borrowBook).get(bookController.getBorrowBook).put(bookController.returnBorrowedBook);

  app.use('/api', router);
};