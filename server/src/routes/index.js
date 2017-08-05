import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/authenticate';

const userController = controllers.users;
const bookController = controllers.bookController;
const apiRoutes = express.Router();

export default (app) => {
  app.get('/', (_, res) => { res.render('template'); });

  apiRoutes.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to Hello-Books api. !',
  }));

  apiRoutes.route('/users')
    .post('/signup', userController.signup)
    .post('/signin', userController.signin)
    .get('/:userId/books', userController.books);

  apiRoutes.route('/books')
    .post(authMiddleware, bookController.create)
    .put(authMiddleware, bookController.edit)
    .get(authMiddleware, bookController.get);

  app.use('/api', apiRoutes);
};
