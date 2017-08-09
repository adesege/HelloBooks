import jwt from 'jsonwebtoken';
import app from '../app';

const router = function router(req, res, next) {
  const token = req.body.authenticate_token || req.query.authenticate_token ||
    req.headers['authenticate-token'];

  if (token) {
    jwt.verify(token, app.get('secret'), (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 'Unauthorized',
          message: 'Failed to authenticate user.',
          code: 401 });
      }

      const userId = req.body.userId || req.query.userId || req.params.userId;
      if (userId || userId !== undefined) {
        const tokenUserId = decoded.user;
        if (parseInt(userId, 10) === parseInt(tokenUserId, 10)) {
        } else {
          return res.status(400).send({
            status: 'Forbidden',
            message: 'Sorry, this is not you.',
            code: 400 });
        }
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).send({
      status: 'Unauthorized',
      message: 'Failed to authenticate user.',
      code: 401
    });
  }
};

export default router;
