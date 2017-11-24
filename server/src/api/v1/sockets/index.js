import NotificationsClass from './Notifications';

/**
 * @returns {undefined}
 * @param {object} io
 */
export default (io) => {
  io.on('connect', (socket) => {
    const Notifications = new NotificationsClass(io);
    socket.on('GET_NOTIFICATIONS', (data) => {
      Notifications.getNotificationById(data);
    });

    socket.on('JOIN', () => {
      socket.emit('GET_ALL_NOTIFICATIONS');
    });
  });
};
