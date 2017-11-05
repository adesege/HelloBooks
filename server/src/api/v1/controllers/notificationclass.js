import model from '../models';

const { Notification } = model;

/**
 * @class NotificationClass
 * @classdesc Notification Class
 */
class NotificationClass {
  /**
   *
   * @method get
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  static get(req, res) {
    Notification
      .findAll({
        order: [['updatedAt', 'DESC']]
      })
      .then(notification => res
        .status(200)
        .send({ data: notification }));
  }
}
export default NotificationClass;
