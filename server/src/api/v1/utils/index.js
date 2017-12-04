import jwt from 'jsonwebtoken';
import { CronJob } from 'cron';
import app from '../../../express';

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
  const secret = app.get('secret');
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

export default {
  randomString,
  signToken,
  returnDate,
  setCron
};
