import model from '../models';
import utils, { formatErrorMessage } from '../utils';
import MailerClass from '../utils/mailer';

const { randomString } = utils; // generates random strings
const { User } = model; // get User model

const { EMAIL_FROM } = process.env;

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
    const { confirmPassword, oauthID } = req.body;
    const name = req.body.name || '';
    const email = req.body.email || '';
    password = User.generateHash(password) || '';
    const userGroup = req.body.group || 'user';

    if (confirmPassword !== req.body.password) {
      return res
        .status(400)
        .send({ message: ['The password field is not the same'] });
    }
    User.create({
      password,
      name,
      email,
      userGroup,
      key: randomString(10),
      oauthID
    }, {
      fields: ['name', 'email', 'password', 'key', 'userGroup', 'oauthID'],
      returning: true,
      plain: true
    }).then((user) => {
      const token = utils.signToken(user);
      return res
        .status(201)
        .send({
          payload: {
            token,
            userId: user.id,
            group: user.userGroup,
          },
          message: ['Your account has been created successfully']
        });
    })
      .catch(errors => res.status(400).send({
        message: formatErrorMessage(errors)
      }));
  }

  /**
   * @method signin
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  static signin(req, res) {
    const password = `${req.body.password}`;
    const email = `${req.body.email}`;
    const oauthID = `${req.body.oauthID}`;

    User.findOne({ where: { oauthID } })
      .then(oauthUser =>
        User.findOne({ where: { email } })
          .then((user) => {
            if (oauthID && !oauthUser) {
              return res.status(400).send({ message: ['Sorry, we can\'t find this account'] });
            }
            if (!oauthID && user) {
              if (!user.validPassword(password)) {
                return res.status(400).send({ message: ['You provided a wrong email address and password'] });
              }
            }
            if (oauthID || user) {
              const token = utils.signToken(user);
              return res.status(200).send({
                payload: {
                  token,
                  userId: user.id,
                  group: user.userGroup,
                },
                message: ['Successfully validated']
              });
            }
            return res.status(404).send({ message: ['Sorry, we can\'t find this account'] });
          }));
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
    User
      .findAll({
        where: id ? { id } : null,
        attributes: [
          'name',
          'userRank',
          'email',
          'id',
          'createdAt',
          'updatedAt'],
        order: [['updatedAt', 'DESC']]
      })
      .then(users => res
        .status(200)
        .send({
          data: users
        }));
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
    const { password, oldPassword, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).send({
        message: ['The passwords are not the same']
      });
    }
    return User
      .findById(id)
      .then((user) => {
        if (!user.validPassword(oldPassword)) {
          return res.status(400).send({
            message: ['Your old password does not match the current password']
          });
        }
        return User
          .update(
            { password },
            {
              where: { id },
              returning: true,
              plain: true
            }
          )
          .then(() =>
            res.status(200)
              .send({
                message: ['User information has been successfully edited']
              }));
      });
  }

  /**
   * @returns {void}
   * @param {object} req
   * @param {object} res
   * @memberof UserClass
   */
  static sendResetPasswordMail(req, res) {
    let { email } = req.body;
    email = `${email}`;
    return User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: ['No account is associated with this email address']
          });
        }
        const validationKey = utils.randomString(10);
        return User.update(
          { key: validationKey },
          {
            where: { id: user.id },
            returning: true,
            plain: true
          }
        )
          .then((updatedUser) => {
            const Mailer = new MailerClass();
            Mailer.to = email;
            Mailer.from = EMAIL_FROM;
            Mailer.subject = 'Password reset request';
            Mailer.html = `
        <p>Dear <strong>${updatedUser[1].name}</strong>,</p>
        <p>This is to notify you that you or someone else has requested for a password reset on Hello Books.</p>
        <p>If this action was not performed by you, kindly ignore this mail as your account is still secure.</p>
        <p>If not, please <a href="${req.protocol}://${req.get('host')}/reset-password/verify/${validationKey}?email=${email}">Click here to reset password</a></p>
        <p>Best regards</p>
        `;

            Mailer.send();

            const responseObject = {
              message: [`A password reset link has been sent to ${email}. It may take upto 5 mins for the mail to arrive.`]
            };
            /* istanbul ignore next */
            responseObject.key = process.env.NODE_ENV === 'test' ? validationKey : '';

            return res.status(200)
              .send(responseObject);
          });
      });
  }

  /**
   *
   * @method get
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  static resetPassword(req, res) {
    const {
      password, confirmPassword, email, validationKey
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).send({
        message: ['The passwords are not the same']
      });
    }
    User.findOne({ where: { email, key: validationKey } })
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: ['There was an error completing your request. Perhaps, you followed a broken link.']
          });
        }
        User.update(
          { password: User.generateHash(password), key: '' },
          {
            where: { email, key: validationKey }
          }
        )
          .then(() => {
            const Mailer = new MailerClass();
            Mailer.to = email;
            Mailer.from = EMAIL_FROM;
            Mailer.subject = 'Your password on Hello Books has been changed';
            Mailer.html = `
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>This is to notify you that you or someone else has changed your account password on Hello Books.</p>
        <p>If this action was performed by you, please ignore this mail as no further action is required from you.</p>
        <p>If not, please contact support at info@hellobooks.herokuapp.com</p>
        <p>Best regards</p>
        `;

            Mailer.send();
            res.status(200)
              .send({
                message: ['Password successfully changed. Please login to your account.']
              });
          });
      });
  }
}

export default UserClass;
