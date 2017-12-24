import models from '../../models';

const { Notification, Book, User } = models;
/**
 * Get notifications from the database
 *
 * @class Notifications
*/
class Notifications {
  /**
   * Creates an instance of Notifications.
   *
   * @param {object} socket - instance of socket.io
   *
   * @memberof Notifications
  */
  constructor(socket) {
    this.socket = socket;
  }
  /**
   * Get notifications
   *
   * @returns {event} notifications
   *
   * @param {object} options
   *
   * @memberof Notifications
   */
  getNotification(options) {
    const where = options || {};
    if (options && options.updatedAt) {
      where.updatedAt = {
        $gte: options.updatedAt
      };
    }
    return Notification
      .findAll({
        include: [{
          model: Book,
          as: 'Book'
        }, {
          model: User,
          as: 'User',
          attributes: ['name', 'email']
        }],
        limit: 5,
        attributes: {},
        order: [['updatedAt', 'DESC']],
        where
      }).then((notifications) => {
        if (notifications.length !== 0) {
          this.notificationData = { notifications };
          this.notificationData.isNew = !!options;
          this.sendNotification();
        }
        return false;
      });
  }

  /**
   * Emit NEW_NOTIFICATION event to the user
   *
   * @returns {undefined}
   *
   * @memberof Notifications
  */
  sendNotification() {
    this.socket.emit('NEW_NOTIFICATIONS', this.notificationData);
  }
}

export default Notifications;
