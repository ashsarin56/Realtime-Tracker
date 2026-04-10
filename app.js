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
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

const server=http.createServer(app);
const io=socketio(server);
io.on('connection',(socket)=>{
    socket.on("send-location", (data)=>{
        io.emit("recieve-location", {id:socket.id, ...data});
    });
    console.log('connection established');
    socket.on('disconnect',()=>{
        io.emit("user-disconnected", socket.id);
        console.log('connection closed');
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});