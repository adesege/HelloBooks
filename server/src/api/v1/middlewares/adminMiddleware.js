/**
 * Admin middleware to aunthenticate an admin
 *
 * @param {object} req - express http request
 * @param {object} res - express http response
 * @param {func} next - move to the next middleware
 *
 * @returns {object} message response
 */
const adminMiddleware = (req, res, next) => {
  const { group } = req.decoded;
  if (group !== 'admin') { // check that the signed in user is an admin
    return res
      .status(403)
      .send({
        message: ['You don\'t have the necessary right to access that page']
      });
  }
  next();
};

export default adminMiddleware;
