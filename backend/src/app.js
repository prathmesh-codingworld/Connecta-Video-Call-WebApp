// 1st step: npm init -y
// 2nd step: npm install express socket.io mongoose cors
// 3rd step: npm install --save-dev nodemon
// 4th step: add "start": "nodemon src/app.js" in package.json
// 5th step: npm start
// 6th step: npm install bcrypt
// 7th step: npm install crypto
// 8th step: npm install http-status-codes

// 1.create app.js, controllers, models, routes folder
// 2.in app.js import express, createServer from node:http, Server from socket.io, mongoose, connectToSocket from controllers/socketManager.js, cors, userRoutes from routes/users.route.js
// 3.in app.js create express app, create server using createServer(app), connect to socket using connectToSocket(server)
// 4.in app.js set port, use cors, use express.json and express.urlencoded with limit 40kb
// 5.in app.js use userRoutes for /api/v1/users
// 6.in app.js create start function, connect to mongodb using mongoose.connect, log mongodb connected message, listen on port and log listening message
// 7.in app.js call start function
// 8.in controllers/socketManager.js import Server from socket.io, create connectToSocket function that takes server as argument, create io using new Server(server), return io
// 9.in models/user.model.js import mongoose and Schema from mongoose, create userSchema with name, username, password, token fields, create User model using mongoose.model, export User
// 10.in routes/users.route.js import Router from express, login and register from controllers/user.controller.js, create router using Router(), define routes for /login and /register using router.route().post(), export router
// 11.in controllers/user.controller.js import httpStatus from http-status, User from models/user.model.js, bcrypt and hash from bcrypt, crypto from crypto, create login function that takes req and res as arguments, get username and password from req.body, check if username and password are provided, find user by username using User.findOne, check if user exists, compare password using bcrypt.compare, generate token using crypto.randomBytes, save token to user and return token in response, handle errors and return appropriate status codes and messages. Create register function that takes req and res as arguments, get name, username and password from req.body, check if user already exists using User.findOne, hash password using bcrypt.hash, create new user using new User(), save new user and return success message in response, handle errors and return appropriate status codes and messages.
// 12.in controllers/user.controller.js export login and register functions

import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/users.route.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
  const connectionDb = await mongoose.connect(
    "mongodb+srv://iamprathmesh23_db_user:IASomulik23@connectacluster.xywbtvx.mongodb.net/?appName=Connectacluster",
  );
  console.log(`MONGODB CONNECTED DB HOST:${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log(`LISTENING ON PORT ${app.get("port")}`);
  });
};

start();
