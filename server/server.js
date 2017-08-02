const path = require('path');

const express = require('express');

const app = express();
const indexPath = path.join(__dirname, '../template/index.html');

app.use(express.static(path.join(__dirname, '../template/')));

app.get('/', (_, res) => { res.sendFile(indexPath); });

app.listen(8080);

console.log('Listening at http://localhost:8080');
