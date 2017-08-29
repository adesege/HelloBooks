import http from 'http';
import express from './express';

<<<<<<< HEAD
const port = parseInt(process.env.PORT, 10) || 5000;
express.set('port', port);
const server = http.createServer(express);
server.listen(port, () => {
  console.log(process.env.PORT, '===========', port, '++++++++++++++++');
});
=======
const port = parseInt(process.env.PORT, 10) || 8090;
express.set('port', port);

const server = http.createServer(express);
server.listen(port);
>>>>>>> 57180ba44b666f56ac38e6d5cb85e1cb5613caed
