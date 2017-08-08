import express from 'express';

const router = function router(req, res, next) {
  const userId = req.body.userId || req.query.userId || req.params.userId;
  const tokenUserId = req.decoded.user;

  if (userId !== tokenUserId) {
    return res.status(400).send({
      status: 'Forbidden',
      message: 'Sorry, this is not you.',
      code: 403 });
  }
  next();
};

export default router;
