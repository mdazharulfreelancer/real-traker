const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Attach express app to the HTTP server
const io = new Server(server); // Attach Socket.IO to the HTTP server

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // Corrected path handling

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on("send-location" , function(data){
        io.emit("recive-data", {id:socket.id, ...data})
    })
    socket.on('disconnect', () => {
        console.log("user-disconnetced")
       io.emit("user-disconnect", socket.id)
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

// Start the server using server.listen, not app.listen
server.listen(3000, () => {
    console.log('Server listening on port 3000');
});