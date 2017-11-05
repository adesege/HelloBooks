import jwt from 'jsonwebtoken';
import app from '../../../express';

const router = (req, res, next) => {
  const token = req.headers['authenticate-token'] || '';

  if (token) {
    /* decode jwt token */
    jwt.verify(token, app.get('secret'), (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ message: 'Failed to authenticate user.' });
      }

      const userId = req.body.userId || req.query.userId
      || req.params.userId; // get userId from request object
      if (userId || userId !== undefined) {
        const tokenUserId = decoded.user;
        if (parseInt(userId, 10) !== parseInt(tokenUserId, 10)) {
          return res
            .status(400)
            .send({ message: 'Sorry, this is not you.' });
        }
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res
      .status(401)
      .send({ message: 'Failed to authenticate user.' });
  }
};

export default router;
