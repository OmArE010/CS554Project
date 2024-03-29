const userRoutes = require('./user');
const gameRoutes = require('./game');
const messageRoutes = require('./message');
const cors = require('cors');

const constructorMethod = (app) => {
    app.use(cors());
    app.use('/', userRoutes);
    app.use('/games', gameRoutes);
    app.use('/messages', messageRoutes);
    app.use('/game-details', gameRoutes);
    // app.use('/user', userRoutes);
  
    app.use('*', (req, res) => {
      res.sendStatus(404);
    });
  };
  
  module.exports = constructorMethod;