#!/usr/bin/env node
// type imports
import { Server } from "http";
import mongoose from "mongoose";

/**
 * Module dependencies.
 */
import app from "./app";
import debugModule from "debug";
const http = require("http");

const debug = debugModule("kroilonv2:server");

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

let server: Server;

// Initialize connection once
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to database");
    server = http.createServer(app);
    // Listen on provided port, on all network interfaces.
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
  },
  err => {
      console.error(err);
  }
);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug(`Listening on ${bind}`);
}