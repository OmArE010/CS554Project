const express = require('express');
// const app = express();
// app.use(express.json());
// const configRoutes = require("./routes");
// const cors = require('cors');

// configRoutes(app);

// app.use(cors());

const http = require('http').createServer(express);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('new client connected', socket.id);
  socket.join("Room1");
  socket.on('user_join', (name) => {
    console.log('A user joined their name is ' + name);
    socket.broadcast.emit('user_join', name);
  });

  socket.on('room', (roomName) => {
    socket.leave();
    socket.join(roomName);
  });

  socket.on('message', ({name, message, roomName}) => {
    console.log(name, message, roomName, socket.id);
    if (Object.values(socket.rooms).indexOf('Room1') > -1) {
      console.log(`room1 found`);
    }
    if (Object.values(socket.rooms).indexOf('Room2') > -1) {
      console.log(`room2 found`);
    }
    io.to(roomName).emit('message', {name, message, roomName});
  });


  socket.on('disconnect', () => {
    console.log('Disconnect Fired');
  });
});

http.listen(4000, () => {
  console.log(`listening on *:${4000}`);
});


// app.listen(4000, () => {
// 	console.log("Server is now running on http://localhost:4000");
// });

