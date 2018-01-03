import model from '../models';
import { sendErrors } from '../utils';

const {
  Notification,
  Book,
  User
} = model;

/**
 * Notification Controller
 *
 * @class NotificationController
*/
class NotificationController {
  /**
   * Gets all notification or by id
   *
   * @method getNotifications
   *
   * @param {object} req - express http request
   * @param {object} res - express http response
   *
   * @return {object} - notifications
  */
  static getNotifications(req, res) {
    const {
      notificationType, name
    } = req.query;
    let { offset, limit } = req.query;
    offset = offset || 0;
    limit = parseInt(limit, 10) || 12;
    const where = {};
    where.notificationType = notificationType || { $ne: null };
    where['$User.name$'] = name ? { $iLike: `${name}%` } : { $ne: null };
    return Notification
      .findAndCountAll({
        include: [{
          model: Book,
          as: 'Book'
        }, {
          model: User,
          as: 'User',
          attributes: ['name', 'email']
        }],
        attributes: {},
        order: [['updatedAt', 'DESC']],
        where,
        offset,
        limit
      })
      .then(notification => res
        .status(200)
        .send({
          notifications: notification.rows,
          pagination: {
            pageSize: notification.rows.length,
            totalCount: notification.count,
            page: Math.floor(offset / limit) + 1,
            pageCount: Math.ceil(notification.count / limit),
            limit
          }
        }))
      .catch(errors => sendErrors({ res, errors }));
  }
}

export default NotificationController;
