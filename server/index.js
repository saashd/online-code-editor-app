const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
app.use(cors());
const PORT = process.env.PORT || 4000;


const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

const CodeBlock = require("./models/CodeBlock");
app.get('/api', async (req, res) => {
    try {
        const codeBlocks = await CodeBlock.find().select({solution: 0});
        res.status(200).send({
            codeBlocks
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Initialize an object to store the mentors of each code block
let mentors = {};

// Handle the socket connections
socketIO.on('connection', (socket) => {
    const {codeId} = socket.handshake.query;
    // Join the socket to the specified code block room
    socket.join(codeId);
    console.log(`⚡: ${socket.id} user just connected!`);

    // Handle the join event from the clients
    socket.on('join', async () => {
        if (!(codeId in mentors)) {
            mentors[codeId] = socket.id
            const data = await CodeBlock.findById(codeId).select({solution: 1, _id: 0});
            socket.emit('role', {role: 'mentor', solution: data});
        } else {
            socket.emit('role', {role: 'student', solution: null});
        }
    });

    // Handle the codeChange event from the clients
    socket.on('codeChange', (data) => {
        socket.to(codeId).emit('updateCode', data);
    });
    // Handle the correctSolution event from the clients
    socket.on('checkSolution', async (data) => {
        //TODO: check another way to compare strings
        const codeBlock = await CodeBlock.findById(codeId);
        const isCorrect = (data.replace(" ", "") === codeBlock.get('solution').replace(" ", ""));
        socketIO.sockets.to(codeId).emit('updateSolutionStatus', isCorrect);
    });

    // Handle the disconnect event from the clients
    socket.on('disconnect', () => {
        console.log(`★: A user disconnected from clock #${codeId}`);
        socket.leave(codeId)
    });
});


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

// Start the HTTP server and listen on the specified port
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
