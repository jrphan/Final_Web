const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 8080;
const helmet = require("helmet");
const morgan = require("morgan");
const database = require("./config/index");
const Route = require("./routes/index");
const path = require("path");

const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
	},
});

let onlineUsers = [];

const addUser = (username, socketId) => {
	!onlineUsers.some(user => onlineUsers.username === username) &&
		onlineUsers.push({ username, socketId });
	return onlineUsers;
};

const removeUser = socketId => {
	onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
	return onlineUsers;
};

io.on("connection", socket => {
	console.log("user connected");

	socket.on("newUser", username => {
		addUser(username, socket.id);
	});

	socket.on("sendNotify", ({ senderName, title }) => {
		onlineUsers.map(onlineUser => {
			io.to(onlineUser.socketId).emit("getNotify", {
				senderName: senderName,
				title: title,
			});
		});
	});

	socket.on("disconnect", () => {
		console.log("a user disconnected!");
		removeUser(socket.id);
	});
});

database.connect();
dotenv.config();

//middleware
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));

//route
Route(app);

server.listen(port, () => {
	console.log(port);
});
