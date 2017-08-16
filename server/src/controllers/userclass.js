import jwt from 'jsonwebtoken';
import app from '../app';
import model from '../models';
import utils from '../utils';

const randomString = utils.randomString; // generates random strings
const User = model.User; // get User model

/**
 * @class UserClass
 * @classdesc User Class
 */
class UserClass {
  /**
   * @method signup
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  static signup(req, res) {
    let password = req.body.password;
    const name = req.body.name || '';
    const email = req.body.email || '';
    password = User.generateHash(password) || '';
    const userGroup = req.body.group || '';

    User.create({
      password,
      name,
      email,
      userGroup,
      key: randomString(10)
    }, {
      fields: ['name', 'email', 'password', 'key', 'userGroup']
    }).then(() => res.status(201).send({
      message: 'Your account has been created successfully. Go to the login page to sign in to your account.' }))
      .catch((error) => {
        error.errors.map((value) => {
          delete value.__raw;
          delete value.path;
          delete value.type;
          delete value.value;
          return value;
        });
        return res.status(400).send({
          message: error.errors
        });
      })
      .catch(error => res.status(500).send({
        message: error.message
      }));
  }

  /**
   * @method signin
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  static signin(req, res) {
    const secret = app.get('secret');
    const password = req.body.password || '';
    const email = req.body.email || '';

    if (email === '') return res.status(400).send({ message: 'The email field is required' });
    if (password === '') return res.status(400).send({ message: 'The password field is required' });

    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          if (!user.validPassword(password)) {
            return res.status(400).send({
              message: 'You provided a wrong password' });
          }
          const token = jwt.sign(
            { user: user.id, group: user.userGroup },
            secret,
            { expiresIn: 24 * 60 * 60 }
          );
          return res.status(200).send(
            {
              token,
              userId: user.id,
              group: user.userGroup,
              message: 'Successfully validated'
            });
        }
        return res.status(404).send({ message: 'User not found' });
      })
      .catch(error => res.status(500).send({
        message: error.message
      }));
  }
  /**
     * @method books
     * @param {object} req
     * @param {object} res
     * @return {object} response
  */
  static books(req, res) {
    const userId = req.params.userId;
    if (userId === null || userId === '') {
      res.status(400).send({
        message: 'User not found' });
    }
    User.findAll({})
      .then((books) => {
        if (books) {
          res.status(200).send({ message: books });
        } else {
          res.status(400).send({ message: 'No record available' });
        }
      })
      .catch(error => res.status(500).send({
        message: error.message
      }));
  }
}
export default UserClass;
