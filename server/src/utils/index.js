import bcrypt from 'bcrypt';

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


const validatePassword = (password, hash) => bcrypt.compareSync(password, hash);

export default {
  randomString,
  validatePassword
};
