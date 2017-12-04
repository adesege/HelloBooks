const router = (req, res, next) => {
  const { group } = req.decoded;
  if (group !== 'admin') { // check that the signed in user is an admin
    return res
      .status(403)
      .send({ message: ['Well, you need to be an admin to go in here'] });
  }
  next();
};

export default router;
