import model from '../models';

const Notification = model.Notification; // get User model

/**
 * @class UserClass
 * @classdesc User Class
 */
class NotificationClass {
  /**
   *
   * @method get
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  static get(req, res) { // get user(s) in the database
    Notification.findAll({
      order: [['updatedAt', 'DESC']]
    })
      .then(notification => res.status(200).send({ data: notification }));
  }
}
export default NotificationClass;
