import model from '../models';
import utils, { sendErrors } from '../utils';
import Mailer from '../utils/Mailer';

const { randomString } = utils; // generates random strings
const { User } = model; // get User model

const { EMAIL_FROM } = process.env;
const mailer = new Mailer();

/**
* User controller
*
* @class UserController
*/
class UserController {
  /**
  * Creates a user
  *
  * @method signup
  *
  * @param {object} req - express http request
  * @param {object} res - express http response
  *
  * @return {object} signed token and user payload
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
      fields: [
        'name',
        'email',
        'password',
        'key',
        'userGroup',
        'oauthID'
      ],
      returning: true,
      plain: true
    }).then((user) => {
      const token = utils.signToken(user);
      return res
        .status(201)
        .send({
          user: {
            token,
            userId: user.id,
            group: user.userGroup,
          },
          message: ['Your account has been created successfully']
        });
    })
      .catch(errors => sendErrors({ res, errors }));
  }

  /**
  * Logs a user into the application
  *
  * @method signin
  *
  * @param {object} req - express http request
  * @param {object} res - express http response
  *
  * @return {object} user token and some user payload
  */
  static signin(req, res) {
    const password = `${req.body.password}`;
    const email = `${req.body.email}`;
    const oauthID = `${req.body.oauthID}`;

    User
      .findOne({
        where: {
          email
        },
        orWhere: {
          oauthID
        }
      })
      .then((oauthUser) => {
        if (oauthID && !oauthUser) {
          return res
            .status(404)
            .send({ message: ['Sorry, we can\'t find this account'] });
        }
        if (!oauthID && oauthUser) {
          if (!oauthUser.validPassword(password)) {
            return res
              .status(401)
              .send({
                message: ['You provided a wrong email address and password']
              });
          }
        }
        if (oauthID || oauthUser) {
          const token = utils.signToken(oauthUser);
          return res
            .status(200)
            .send({
              user: {
                token,
                userId: oauthUser.id,
                group: oauthUser.userGroup,
              },
              message: ['Successfully validated']
            });
        }
        return res
          .status(404)
          .send({ message: ['Sorry, we can\'t find this account'] });
      })
      .catch(errors => sendErrors({ res, errors }));
  }

  /**
    * Get all users or a particular user
    *
    * @method getUsers
    *
    * @param {object} req - express http request
    * @param {object} res - express http response
    *
    * @return {object} An array of users or a user
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
          users
        }))
      .catch(errors => sendErrors({ res, errors }));
  }

  /**
   * Edit a user
   *
   * @method editUser
   *
   * @param {object} req - express http request
   * @param {object} res - express http response
   *
   * @return {object} message response
  */
  static editUser(req, res) {
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
            { password: User.generateHash(password) },
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
              }))
          .catch(errors => sendErrors({ res, errors }));
      })
      .catch(errors => sendErrors({ res, errors }));
  }

  /**
   * Send reset password mail
   *
   * @returns {object} message response
   *
   * @param {object} req - express http request
   * @param {object} res - express http response
   *
   * @memberof UserController
  */
  static sendResetPasswordMail(req, res) {
    let { email } = req.body;
    email = `${email}`;
    return User
      .findOne({ where: { email } })
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
            mailer.to = email;
            mailer.from = EMAIL_FROM;
            mailer.subject = 'Password reset request';
            mailer.html = `
            <p>Dear <strong>${updatedUser[1].name}</strong>,</p>
            <p>This is to notify you that you or someone 
            else has requested for a password reset on Hello Books.</p>
            <p>If this action was not performed by you, 
            kindly ignore this mail as your account is still secure.</p>
            <p>If not, please <a 
            href="${req.protocol}://${req.get('host')}/reset-password
            /verify/${validationKey}?email=${email}">
            Click here to reset password
            </a>
            </p>
            <p>Best regards</p>
            `;

            mailer.send();

            const responseObject = {
              message: [
                `A password reset link has been sent to ${email}.` +
                 ' It may take upto 5 mins for the mail to arrive.'
              ]
            };
            /* istanbul ignore next */
            responseObject.key = process.env.NODE_ENV === 'test' ?
              validationKey :
              '';

            return res.status(200)
              .send(responseObject);
          })
          .catch(errors => sendErrors({ res, errors }));
      })
      .catch(errors => sendErrors({ res, errors }));
  }

  /**
   * Change user's password
   *
   * @method resetPassword
   *
   * @param {object} req - express http request
   * @param {object} res - express http response
   *
   * @return {object} message response
  */
  static resetPassword(req, res) {
    const {
      password,
      confirmPassword,
      email,
      validationKey
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).send({
        message: ['The passwords are not the same']
      });
    }
    User
      .findOne({
        where: {
          email,
          key: validationKey
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: [
              'There was an error completing your request.' +
               ' Perhaps, you followed a broken link.'
            ]
          });
        }
        User.update(
          {
            password: User.generateHash(password),
            key: ''
          },
          {
            where: { email, key: validationKey }
          }
        )
          .then(() => {
            mailer.to = email;
            mailer.from = EMAIL_FROM;
            mailer.subject = 'Your password on Hello Books has been changed';
            mailer.html = `
            <p>Hello <strong>${user.name}</strong>,</p>
            <p>This is to notify you that you or someone else 
            has changed your account password on Hello Books.</p>
            <p>If this action was performed by you, 
            please ignore this mail as no 
            further action is required from you.</p>
            <p>If not, please contact 
            support at info@hellobooks.herokuapp.com</p>
            <p>Best regards</p>
            `;

            mailer.send();
            return res.status(200)
              .send({
                message: [
                  'Password successfully changed. Please login to your account.'
                ]
              });
          })
          .catch(errors => sendErrors({ res, errors }));
      })
      .catch(errors => sendErrors({ res, errors }));
  }
}

export default UserController;

