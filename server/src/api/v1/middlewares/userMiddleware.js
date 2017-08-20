const router = (req, res, next) => {
  const group = req.decoded.group;
  if (group !== 'user') { // check that the signed in user is a user
    return res.status(403).send({ message: 'Well, you need to be a user to go in here' });
  }
  next();
};

export default router;
