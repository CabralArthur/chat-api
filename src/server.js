const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");


const initSocket = server => {
	const io = new Server(server, {
		cors: {
			origin: 'http://localhost:3000'
		}
	});

	io.on('connect', socket => {
		socket.on('channels:join', data => {
			socket.join(data);

			console.log(`User Joined with the id ${socket.id} joined in ${data} room.`);

			const eventData = {
				username: socket.id,
				room: data
			};

			socket.emit('channels:joined', eventData);
		})

		socket.on('messages:send', data => {
			socket.to(data.room).emit('messages:sent', data);
		})

		socket.on('disconnect', () => {
			console.log('User disconnected', socket.id);
		})
	});
};

const start = () => {
	const app = express();

	app.use(cors());

	const server = createServer(app);

	server.listen(3001, () => {
		console.log('Server running on 3001 port');

		initSocket(server)
	})
};

module.exports = {
	start
}