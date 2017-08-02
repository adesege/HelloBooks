import Sequelize from 'sequelize';
import model from '../models';
import utils from '../utils';


const randomString = utils.randomString;
const User = model.User;

export default {
  create(req, res) {
    const password = User.generateHash(req.body.password);
    const name = req.body.name;
    const email = req.body.email;
    if (name.length < 3) { return res.status(400).send({ message: 'The name you entered must be more than 3 characters', status: 'Bad Request', code: 400 }); }
    User.create({
      password,
      name,
      email,
      key: randomString(10)
    },
    {
      fields: ['name', 'email', 'password', 'key']
    })
      .then(() => res.status(201).send({ message: 'Your account has been created successfully. Go to the login page to sign in to your account.', status: '200 OK', code: 200 }))
      .catch(Sequelize.ValidationError, error => res.status(400).send({
        message: error.errors[0].message,
        status: 'Bad Request',
        code: 400
      }))
      .catch(error => res.status(400).send({
        message: error.errors[0].message,
        status: 'Internal Server Error',
        code: 500
      }));
  }
};
