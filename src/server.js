const express = require('express');
const { Server } = require('socket.io');

const start = () => {
    const port = 3000;
    const app = express();

    app.listen(this.port, () => {
        console.log(`App running on port ${port}.`)

        connect()
    });
};

const connect = () => {
    const io = new Server(3000);

    io.on("connect", (socket) => {
        console.log('Connected client!');
    })
}

module.exports = {
    start
}