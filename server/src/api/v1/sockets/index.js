import Notifications from './Notifications';

/**
 * Exports a function so we can pass socket as parameter
 *
 * @returns {undefined}
 *
 * @param {object} io
 */
export default (io) => {
  io.on('connect', (socket) => {
    const notifications = new Notifications(io);
    socket.on('GET_NOTIFICATIONS', (data) => {
      notifications.getNotification(data);
    });

    socket.on('JOIN', () => {
      socket.emit('GET_ALL_NOTIFICATIONS');
    });
  });
};
