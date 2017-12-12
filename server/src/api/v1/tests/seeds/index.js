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

export const truncateUserTable = () => {
  User.destroy({
    where: {},
    truncate: true
  });
};

export const seedUserTable = () => {
  truncateUserTable();
  User.bulkCreate(userData);
};

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
