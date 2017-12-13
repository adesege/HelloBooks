import models from '../../models';
import { user, admin } from './user';
import utils from '../../utils';

const { User } = models;

const userData = [
  {
    ...user,
    password: User.generateHash(user.password)
  },
  {
    ...admin,
    password: User.generateHash(admin.password)
  }
];

/**
 * Truncare user table
 *
 * @return {undefined}
 */
export const truncateUserTable = () => {
  User.destroy({
    where: {},
    truncate: true
  });
};

/**
 * Seed the user table
 *
 * @return {undefined}
 */
export const seedUserTable = () => {
  truncateUserTable();
  User.bulkCreate(userData);
};

/**
 * Sign JWT token
 *
 * @returns {object} user payload
 */
export const generateToken = () => {
  seedUserTable();
  const adminToken = utils.signToken(admin);
  const userToken = utils.signToken(user);
  const userId = user.id;
  const adminId = admin.id;
  return {
    adminToken,
    userToken,
    userId,
    adminId
  };
};

export default {};
