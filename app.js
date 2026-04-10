const express = require('express');
const app = express();
const path=require('path');
const http = require('http');
const socketio = require('socket.io');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

app.use(morgan('dev'));
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

const server=http.createServer(app);
const io=socketio(server);
io.on('connection', (socket) => {
    console.log('connection established');
});

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});