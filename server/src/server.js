import http from 'http';
import socket from 'socket.io';
import express from './express';
import socketConfig from './api/v1/sockets';

const port = parseInt(process.env.PORT, 10) || 5000;
express.set('port', port);
const server = http.createServer(express);
const io = socket(server);
socketConfig(io);
server.listen(port);
