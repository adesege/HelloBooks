import models from '../../models';

const { Notification, Book, User } = models;
/**
 * @class Notifications
 */
class Notifications {
  /**
   * Creates an instance of Notifications.
   * @param {any} socket
   * @memberof Notifications
   */
  constructor(socket) {
    this.socket = socket;
  }
  /**
   * @returns {event} notifications
   * @param {any} data
   * @memberof Notifications
   */
  getNotificationById(data) {
    const where = data || {};
    if (data && data.updatedAt) {
      where.updatedAt = {
        $gte: data.updatedAt
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
          attributes: ['name']
        }],
        limit: 5,
        attributes: {},
        order: [['updatedAt', 'DESC']],
        where
      }).then((notifications) => {
        if (notifications.length !== 0) {
          this.notificationData = { notifications };
          this.notificationData.isNew = !!data;
          this.sendNotification();
        }
        return false;
      });
  }

  /**
   * @returns {undefined}
   * @memberof Notifications
   */
  sendNotification() {
    this.socket.emit('NEW_NOTIFICATIONS', this.notificationData);
  }
}

export default Notifications;
