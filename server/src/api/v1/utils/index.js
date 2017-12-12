import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { CronJob } from 'cron';

const randomString = (limit = 5) => {
  let randArray = '';
  limit = [...Array(parseInt(limit, 10)).keys()];
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomStrings = limit.map(() => {
    randArray += possible.charAt(Math.floor(Math.random() * possible.length));
    return randArray;
  });
  return randomStrings.join('');
};

const signToken = (user) => {
  const secret = process.env.TOKEN_SECRET;
  return jwt.sign(
    { user: user.id, group: user.userGroup },
    secret,
    { expiresIn: 24 * 60 * 60 }
  );
};

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

export const setCron = props => new CronJob(props);

export const formatErrorMessage = (errors) => {
  if (errors.errors) {
    return errors.errors.map(error => error.message);
  }
  return [errors.message];
};

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
