import controllers from '../controllers';

const userController = controllers.users;

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Hello-Books api. !',
  }));

  app.post('/api/users/signup', userController.signup);
  app.post('/api/users/signin', userController.signin);
};
