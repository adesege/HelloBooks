import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/authenticate';

const userController = controllers.users;
const bookController = controllers.books;
const apiRoutes = express.Router();

export default (app) => {
  app.get('/', (_, res) => { res.render('template'); });

  apiRoutes.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to Hello-Books api. !',
  }));

  apiRoutes.post('/users/signup', userController.signup);
  apiRoutes.post('/users/signin', userController.signin);

  apiRoutes.post('/books', authMiddleware, bookController.create);

  app.use('/api', apiRoutes);
};
