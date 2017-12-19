import socket from './config';

/**
 * Emit a particular notification
 *
 * @param {object} payload
 *
 * @returns {undefined}
 */
const ioGetNotifications = (payload) => {
  socket.emit('GET_NOTIFICATIONS', payload);
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
 * @param {func} callback
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
