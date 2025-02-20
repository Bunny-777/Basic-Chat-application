const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const socket = require('socket.io');
const server = http.createServer(app);

const io = socket(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('index');
});

io.on('connection', function (socket) {
    console.log("User connected:", socket.id);

    socket.on('mess', function (data) {
        io.emit('reply', data); // Broadcast message to all users
    });

    socket.on('disconnect', function () {
        console.log("User disconnected:", socket.id);
    });
});

const port = 4000;
server.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});
