import dotEnv from 'dotenv';
import cloudinary from 'cloudinary';

dotEnv.config();

const { REACT_APP_CLOUD_NAME, REACT_APP_API_KEY, REACT_APP_API_SECRET } = process.env;
cloudinary.config({
  cloud_name: REACT_APP_CLOUD_NAME,
  api_key: REACT_APP_API_KEY,
  api_secret: REACT_APP_API_SECRET
});

