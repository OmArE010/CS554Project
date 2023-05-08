const express = require('express');
const app = express();
app.use(express.json());
const configRoutes = require("./routes");
const cors = require('cors');

configRoutes(app);

app.use(cors());

const http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('new client connected', socket.id);
  socket.on('user_join', (name) => {
    console.log('A user joined their name is ' + name);
    socket.broadcast.emit('user_join', name);
  });

  socket.on('message', ({sender, message, receiver}) => {

    io.emit('message', {sender, message, receiver});
  });


  socket.on('disconnect', () => {
    console.log('Disconnect Fired');
  });
});

http.listen(4000, () => {
  console.log(`listening on *:${4000}`);
});
