const router = (req, res, next) => {
  const group = req.decoded.group;
  if (group !== 'user') {
    return res.status(403).send({
      status: 'Forbidden',
      message: 'Well, you need to be a user to go in here',
      code: 403 });
  }
  next();
};

export default router;
