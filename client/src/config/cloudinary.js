import dotEnv from 'dotenv';
import cloudinary from 'cloudinary';

dotEnv.config();

const { APP_CLOUD_NAME, APP_API_KEY, APP_API_SECRET } = process.env;
cloudinary.config({
  cloud_name: APP_CLOUD_NAME,
  api_key: APP_API_KEY,
  api_secret: APP_API_SECRET
});

