function initiateSocket(server) {

const io = require("socket.io")(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("User Connected!");

    // Handle joining a chat room
    socket.on("joinChat", ({ sender, receiver }) => {
        // Generate a room ID on the server (sorted for consistency)
        const roomId = [sender, receiver].sort().join("_");

        // Join the generated room
        socket.join(roomId);
        console.log(`${sender} joined room: ${roomId}`);
    });

    // Handle sending message
    socket.on("sendmessage", ({ sender, receiver, text }) => {
        // Generate the same room ID for sending the message
        const roomId = [sender, receiver].sort().join("_");

        console.log(`Message from ${sender} to ${receiver} in room ${roomId}: ${text}`);

        // Emit message ONLY to users in the same room
        io.to(roomId).emit("recieveMessage", { sender, receiver, text });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
        console.log("User Disconnected!");
    });
});
}

// initiateSocket()

module.exports = { initiateSocket }
