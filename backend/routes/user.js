const express = require("express");
const router = express.Router();
const axios = require("axios");
const redis = require("redis");
const client = redis.createClient();
client.connect().then(() => {});
const data = require("../data");
const users = data.userData;
const games = data.gameData;
router.use(express.urlencoded({extended: true}));

router.route('/login').get(async (req, res) => {
    if (req.session.user) return res.redirect("/private");
    return res.render("login_page");
  });

router.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await users.validateUser(username, password);
    if (user) {
      req.session.user = user;
      return res.status(200).json({...user, redirectUrl: '/games/1'});
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

router.route("/logout").get(async (req, res) => {});

router.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, username, password } = req.body;
    console.log(`req.body: ${ firstname, lastname, username, password }`)
    const newUser = await users.createUser(
      firstname,
      lastname,
      username,
      password
    );
    req.session.user = newUser;
    res.redirect("/");
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

// router
//     .post(async (req, res) => {
//     try {
//       const { username, password } = req.body;
//       const user = await users.getUserByUsername(username);
//       if (user && user.password === password) {
//         req.session.user = user;
//         return res.redirect("/private");
//       }
//       return res.render("login_page", { error: "Invalid username/password" });
//     } catch (e) {
//       return res.status(500).render("login_page", { error: e });
//     }

//   });

router.route("/logout").get(async (req, res) => {
  req.session.destroy();
  return res.redirect("/");
});

router.route("/register").get(async (req, res) => {
  if (req.session.user) return res.redirect("/private");
  return res.render("register_page");
});

router.route("/register").post(async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await users.getUserByUsername(username);
    if (user) {
      return res.render("register_page", {
        error: "Username already exists",
      });
    }
    const newUser = await users.addUser(username, password, email);
    req.session.user = newUser;
    return res.redirect("/private");
  } catch (e) {
    return res.status(500).render("register_page", { error: e });
  }
});

router.route("/private").get(async (req, res) => {
    if (!req.session.user) return res.redirect("/");
    const user = req.session.user;
    const userGames = user.games;
    const gameList = [];
    for (let i = 0; i < userGames.length; i++) {
        const game = await games.getGameById(userGames[i]);
        gameList.push(game);
    }
    return res.render("private_page", { user: user, games: gameList });
});

router.route("/private").post(async (req, res) => {
    const user = req.session.user;
    const game = await games.getGameById(req.body.gameId);
    const gameList = user.games;
    gameList.push(game._id);
    const updatedUser = await users.updateUser(user._id, user.username, user.password, user.email, gameList);
    req.session.user = updatedUser;
    return res.redirect("/private");
});

module.exports = router;
