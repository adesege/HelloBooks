import express from 'express';

const router = express.Router();

router.get('/test', (_, res) => res.send({ message: 'Test passed' }));

router.get('*', (_, res) => res.render('index.html')); // pipe template/index.html to view

export default router;
