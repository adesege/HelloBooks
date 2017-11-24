import socket from './config';

/**
 * @returns {undefined}
 * @param {object} notificationId
 */
const ioGetNotifications = (notificationId) => {
  socket.emit('GET_NOTIFICATIONS', notificationId);
};

/**
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
 * @returns {undefined}
 * @param {func} callback
 */
const ioNewNotifications = (callback) => {
  socket.on('NEW_NOTIFICATIONS', (data) => {
    if (data.notifications.length >= 1) {
      return callback(null, data);
    }
    callback(null);
  });
};

export { ioGetNotifications, ioJoin, ioNewNotifications };
export default {};
