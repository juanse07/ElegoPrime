import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import app from "./app";
import env from "./env";

// Initialize HTTP server
const server = http.createServer(app);

console.log("Initializing Socket.IO server...");
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [env.WEBSITE_URL] // In production, only allow the production URL
    : ['http://localhost:3000']; // In development, allow localhost:3000

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  path: "/socket.io/",
  pingInterval: 30000, // 30 seconds
  pingTimeout: 60000, // 60 seconds
});

// Handle Socket.IO events
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Message received:", data);
    socket.emit("response", `Server received: ${data}`);
  });

  socket.on("disconnect", (reason) => {
    console.log("Client disconnected:", socket.id, "Reason:", reason);
  });
});

// Handle connection errors
io.engine.on("connection_error", (err) => {
  console.error("Connection error:", err);
});

// Add MongoDB Change Streams
mongoose.connection.once("open", () => {
  console.log("MongoDB connection is open, setting up change streams...");

  // Reference your new collection for the NewServiceRequest model
  const newServiceRequestCollection = mongoose.connection.collection("newservicerequests");

  // Watch for changes in the collection
  const changeStream = newServiceRequestCollection.watch();

  changeStream.on("change", (change) => {
    console.log("Change detected:", change);

    if (change.operationType === "insert") {
      // Emit new data to clients
      io.emit("newServiceRequest", change.fullDocument);
      console.log("Emitted newServiceRequest event via Socket.IO", change.fullDocument);
    }

    if (change.operationType === "update") {
      // Emit update details
      io.emit("updateServiceRequest", change.updateDescription);
      console.log("Emitted updateServiceRequest event via Socket.IO");
    }

    if (change.operationType === "delete") {
      // Emit deletion notification
      io.emit("deleteServiceRequest", change.documentKey);
      console.log("Emitted deleteServiceRequest event via Socket.IO");
    }
  });

  changeStream.on("error", (error) => {
    console.error("Error in change stream:", error);
  });
});

// Start the server after connecting to MongoDB
const port = process.env.PORT || 4000;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Socket.IO path: ${io.path()}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

export { io };







/////////////
// import mongoose from "mongoose";
// import app from "./app";
// import env from "./env";
// const port= process.env.PORT;

// mongoose.connect(env.MONGO_CONNECTION_STRING) 
// .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(port, () => {
//         console.log(`Server is running on port ${port}`);
//     });
// })
// .catch(console.error);
