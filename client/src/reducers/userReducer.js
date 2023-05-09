const initalState = {
  username: "",
  firstname: "",
  lastname: "",
  password: "",
  gamesSelling: "",
  loggedIn: false,
};
let copyState = null;
let index = 0;

const userReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_USER":
      console.log("payload", payload);
      const newUser = {
        username: payload.username,
        firstname: payload.firstname,
        lastname: payload.lastname,
        password: payload.password,
        gamesSelling: payload.gamesSelling,
        loggedIn: payload.loggedIn,
      };
      return { ...newUser };
    default:
      return state;
  }
};

export default userReducer;
