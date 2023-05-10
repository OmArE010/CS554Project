const setUser = (
  username,
  firstname,
  lastname,
  password,
  gamesSelling,
  loggedIn
) => ({
  type: "SET_USER",
  payload: {
    username: username,
    firstname: firstname,
    lastname: lastname,
    password: password,
    gamesSelling: gamesSelling,
    loggedIn: loggedIn,
  },
});

module.exports = {
  setUser,
};
