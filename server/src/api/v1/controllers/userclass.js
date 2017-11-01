import model from '../models';
import utils from '../utils';

const { randomString } = utils; // generates random strings
const { User } = model; // get User model

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
    let { password } = req.body;
    const { confirmPassword } = req.body;
    const name = req.body.name || '';
    const email = req.body.email || '';
    password = User.generateHash(password) || '';
    const userGroup = req.body.group || 'user';

    if (confirmPassword !== req.body.password) {
      return res
        .status(400)
        .send({ message: 'The password field is not the same ' });
    }
    User.create({
      password,
      name,
      email,
      userGroup,
      key: randomString(10)
    }, {
      fields: ['name', 'email', 'password', 'key', 'userGroup'],
      returning: true,
      plain: true
    }).then((user) => {
      const token = utils.signToken(user);
      return res
        .status(201)
        .send({
          token,
          userId: user.id,
          group: user.userGroup,
          message: 'Your account has been created successfully.'
        });
    })
      .catch((errors) => {
        const errorsArray = errors.errors.map(error => error.message);
        return res.status(400).send({
          message: errorsArray
        });
      });
  }

  /**
   * @method signin
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  static signin(req, res) {
    const password = req.body.password || '';
    const email = req.body.email || '';

    if (email === '') {
      return res
        .status(400)
        .send({ message: 'The email field is required' });
    }
    if (password === '') {
      return res
        .status(400)
        .send({ message: 'The password field is required' });
    }

    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          if (!user.validPassword(password)) {
            return res.status(400).send({ message: 'You provided a wrong email address and password' });
          }
          const token = utils.signToken(user);
          return res.status(200).send({
            token,
            userId: user.id,
            group: user.userGroup,
            message: 'Successfully validated'
          });
        }
        return res.status(404).send({ message: 'User not found' });
      });
  }

  /**
   *
   * @method get
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  static getUsers(req, res) { // get user(s) in the database
    const id = req.params.userId;
    User.findAll({
      where: id ? { id } : null,
      attributes: ['name', 'userRank', 'email', 'id', 'createdAt', 'updatedAt'],
      order: [['updatedAt', 'DESC']]
    })
      .then(users => res.status(200).send({ data: users }));
  }

  /**
   *
   * @method get
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  static updateUser(req, res) { // get user(s) in the database
    const id = req.params.userId;
    const { password, oldPassword, passwordConfirm } = req.body;
    if (password !== passwordConfirm) {
      return res.status(400).send({
        message: 'The password is not the same'
      });
    }
    User.findById(id)
      .then((user) => {
        if (!user.validPassword(oldPassword)) {
          return res.status(400).send({
            message: 'Your old password does not match the current password'
          });
        }
        User.update(
          { password },
          {
            where: { id },
            returning: true,
            plain: true
          }
        )
          .then(updatedUser =>
            res.status(200)
              .send({
                data: updatedUser,
                message: 'User information has been successfully edited'
              }));
      });
  }
}
export default UserClass;
