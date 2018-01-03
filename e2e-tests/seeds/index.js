import models from '../../server/dist/api/v1/models';
import categories from './categories';
import user from './user';

const { bookCategory, User, Book } = models;

/**
 * Truncare Category table
 *
 * @return {undefined}
 */
export const truncateCategoryTable = () => {
  bookCategory.destroy({
    where: {},
    truncate: true
  });
};

/**
 * Seed the Category table
 *
 * @return {undefined}
 */
export const seedCategoryTable = () => {
  truncateCategoryTable();
  bookCategory.bulkCreate(categories);
};

/**
 * Truncare User table
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
 * Seed the User table
 *
 * @return {undefined}
 */
export const seedUserTable = () => {
  truncateUserTable();
  const newUser = {
    ...user,
    password: User.generateHash(user.password)
  };
  User.bulkCreate([newUser]);
};

/**
 * Truncare Book table
 *
 * @return {undefined}
 */
export const truncateBookTable = () => {
  Book.destroy({
    where: {},
    truncate: true
  });
};

