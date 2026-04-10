const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
app.use(morgan('dev'));
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.set(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3000;

const server=http.createServer(app);
const io=socketio(server);
app.get('/', (req, res) => {
    res.send('hello there!');
});
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});