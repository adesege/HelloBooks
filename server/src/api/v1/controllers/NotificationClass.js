import model from '../models';

const { Notification, Book, User } = model;

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
          attributes: ['name']
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
          data: notification.rows,
          pagination: {
            pageSize: notification.rows.length,
            totalCount: notification.count,
            page: Math.floor(offset / limit) + 1,
            pageCount: Math.ceil(notification.count / limit),
            limit
          }
        }));
  }
}

export default NotificationClass;
