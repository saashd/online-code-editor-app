const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
app.use(cors());
const PORT = 4000;


const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

// Initialize an object to store the mentors of each code block
let mentors = {};

// Handle the socket connections
socketIO.on('connection', (socket) => {
    const {codeBlockIndex} = socket.handshake.query;
    // Join the socket to the specified code block room
    socket.join(codeBlockIndex);

    console.log(`⚡: ${socket.id} user just connected!`);

    // Handle the join event from the clients
    socket.on('join', () => {
        if (!(codeBlockIndex in mentors)) {
            mentors[codeBlockIndex] = socket.id
            socket.emit('role', 'mentor');
        } else {
            socket.emit('role', 'student');
        }
    });

    // Handle the codeChange event from the clients
    socket.on('codeChange', (data) => {
        socket.to(codeBlockIndex).emit('updateCode', data);
    });

    // Handle the disconnect event from the clients
    socket.on('disconnect', () => {
        //TODO: depends on if mentor allowed to comeback.
        if (mentors[codeBlockIndex] === socket.id) {
            delete mentors[codeBlockIndex]
        }
        console.log(`★: A user disconnected from clock #${codeBlockIndex}`);
        socket.leave(codeBlockIndex)
    });
});

// Start the HTTP server and listen on the specified port
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
