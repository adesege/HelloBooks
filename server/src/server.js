import http from 'http';
import express from './express';

const port = parseInt(process.env.PORT, 10) || 5000;
express.set('port', port);
const server = http.createServer(express);
server.listen(port, () => {
  console.log(process.env.PORT, '===========', port, '++++++++++++++++');
});
