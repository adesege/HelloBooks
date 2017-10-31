import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.APP_CLOUD_NAME,
  api_key: process.env.APP_API_KEY,
  api_secret: process.env.APP_API_SECRET
});

