import express from 'express';

const routes = express.Router();

routes
  .get('/test', (_, res) =>
    res.send({ message: 'Test passed' }));

routes
  .get(/^((?!(\/api\/v[0-9]\/)).)*$/, (req, res) =>
    res.render('index.html'));

export default routes;
