import jwt from 'jsonwebtoken';
import express from 'express';
import app from '../app';

const router = express.Router();

router.use((req, res, next) => {
  const token = req.body.authenticate_token || req.query.authenticate_token || req.headers['authenticate-token'];

  if (token) {
    jwt.verify(token, app.get('secret'), (err, decoded) => {
      if (err) {
        return res.status(400).send({
          status: 'Unauthorized',
          message: 'Failed to authenticate user.',
          code: 400 });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      status: 'Unauthorized',
      message: 'Failed to authenticate user.',
      code: 401
    });
  }
});

export default router;
