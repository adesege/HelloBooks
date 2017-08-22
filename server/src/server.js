import http from 'http';
import express from './express';

const port = parseInt(process.env.PORT, 10) || 8090;
express.set('port', port);
const server = http.createServer(express);
server.listen(port, function(){
    console.log(process.env.PORT,'===========', port, '++++++++++++++++');
});
