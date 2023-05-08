const userRoutes = require('./user');
const gameRoutes = require('./game');
const cors = require('cors');

const constructorMethod = (app) => {
    app.use(cors());
    app.use('/login', userRoutes);
    app.use('/signup', userRoutes);
    app.use('/games', gameRoutes);
    app.use('/user', userRoutes);
  
    app.use('*', (req, res) => {
      res.sendStatus(404);
    });
  };
  
  module.exports = constructorMethod;