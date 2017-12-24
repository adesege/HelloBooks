import socket from './config';

/**
 * Emit a particular notification
 *
 * @param {object} options - options for getting new notifications
 *
 * @returns {undefined}
 */
const ioGetNotifications = (options) => {
  socket.emit('GET_NOTIFICATIONS', options);
};

/**
 * Emit JOIN event
 * and get the most recent notifications
 *
 * @returns {undefined}
 */
const ioJoin = () => {
  socket.on('connect', () => {
    socket.emit('JOIN');
  });
};

socket.on('GET_ALL_NOTIFICATIONS', () => {
  ioGetNotifications();
});

/**
 * Get new notification from server
 *
 * @param {func} callback - callback function to resolve new notifications
 *
 * @returns {undefined}
 */
const ioNewNotifications = (callback) => {
  socket.on('NEW_NOTIFICATIONS', (data) => {
    if (data.notifications.length >= 1) {
      return callback(null, data);
    }
    callback(null);
  });
};

export {
  ioGetNotifications,
  ioJoin,
  ioNewNotifications };
export default {};
