import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { CronJob } from 'cron';

/**
 * Generate random characters
 *
 * @returns {string} random string
 *
 * @param {number} limit - random string limit
 */
const randomString = (limit = 5) => {
  let randArray = '';
  limit = [...Array(parseInt(limit, 10)).keys()];
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabc' +
  'defghijklmnopqrstuvwxyz0123456789';
  const randomStrings = limit.map(() => {
    randArray += possible.charAt(Math.floor(Math.random() * possible.length));
    return randArray;
  });
  return randomStrings.join('');
};

/**
 * Signs JWT token for authenticating a user
 *
 * @returns {string} JWT signed token
 *
 * @param {object} user - user object to sign token with
 */
const signToken = (user) => {
  const secret = process.env.TOKEN_SECRET;
  return jwt.sign(
    { user: user.id, group: user.userGroup },
    secret,
    { expiresIn: 24 * 60 * 60 }
  );
};

/**
 * Gets the number of days until return date
 * or returns all the number of days until return datee
 *
 * @returns {number} - The number of days
 * @returns {object} - ranks
 *
 * @param {number} rank - user rank
 */
const returnDate = (rank) => {
  const ranks = {
    beginner: 3,
    amateur: 5,
    senior: 10,
    enthusiast: 13,
    expert: 15,
    leader: 18,
    veteran: 20,
    master: 25
  };
  if (rank) {
    return ranks[rank];
  }
  return ranks;
};

/**
 * Sets cron job options
 *
 * @returns {constructor} Cron job constructor
 *
 * @param {object} options - cron job options
 */
export const setCron = options => new CronJob(options);

/**
 * Format error messages
 *
 * @returns {array} an array of errors
 *
 * @param {objects} errors - sequelize errors object
 */
export const formatErrorMessage = (errors) => {
  if (errors.errors) {
    return errors.errors.map(error => error.message);
  }
  return [errors.message];
};

/**
 * Formats and sends error messages
 *
 * @returns {object} express http response
 *
 * @param {object} errors - sequelize errors object
 * @param {object} res - express http response object
 */
export const sendErrors = ({ errors, res }) => {
  if (errors.name === 'SequelizeValidationError') {
    return res
      .status(400)
      .send({
        message: formatErrorMessage(errors)
      });
  }
  return res
    .status(500)
    .send({
      message: formatErrorMessage(errors)
    });
};

/**
 * Eagerly load files in a given directory
 *
 * @returns {object} files
 *
 * @param {object} config - configuration object to eagerly load files
 */
export const eagerLoadFiles = (config) => {
  const { basename, dirname } = config;
  const files = {};
  fs
    .readdirSync(dirname)
    .filter(file =>
      (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
    .forEach((file) => {
      /* eslint-disable global-require, import/no-dynamic-require */
      const requireFile = require(path.join(dirname, file)).default;
      files[requireFile.name] = requireFile;
    });
  return files;
};

export default {
  randomString,
  signToken,
  returnDate,
  setCron,
  eagerLoadFiles
};
