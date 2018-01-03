import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate a user
 *
 * @param {object} req - express http request
 * @param {object} res - express http response
 * @param {func} next - move to the next middleware
 *
 * @returns {object} message response
 */
const authMiddleware = (req, res, next) => {
  const token = req.headers['authenticate-token'] || '';

  if (token) {
    /* decode jwt token */
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({
            message: ['Your session has expired. Please try logging in again']
          });
      }

      const userId =
      req.query.userId ||
      req.params.userId; // get userId from request object
      if (userId || userId !== undefined) {
        const tokenUserId = decoded.user;
        if (parseInt(userId, 10) !== parseInt(tokenUserId, 10)) {
          return res
            .status(403)
            .send({
              message: ['You are not allowed to perform that action']
            });
        }
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res
      .status(403)
      .send({
        message: ['Your session has expired. Please try logging in again']
      });
  }
};

export default authMiddleware;
