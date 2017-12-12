export const user = {
  name: 'Testing test name',
  password: 'Testing password',
  confirmPassword: 'Testing password',
  email: 'usertest@hellobooks.com',
  group: 'user',
  oauthID: '',
  id: 1,
  userGroup: 'user',
  key: '2345678kjhgfdsaertyu'
};

export const admin = {
  ...user,
  email: 'admin@hellobooks.com',
  group: 'admin',
  id: 2,
  userGroup: 'admin'
};
