import dotEnv from 'dotenv';

dotEnv.config();

export default {
  facebook: {
    clientID: process.env.AUTH_FACEBOOK_CLIENT_ID,
    clientSecret: process.env.AUTH_FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.AUTH_FACEBOOK_CALLBACK
  },
  google: {
    clientID: process.env.AUTH_GOOGLE_CLIENT_ID,
    clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.AUTH_GOOGLE_CALLBACK
  }
};

