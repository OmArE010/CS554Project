const dbConnection = require("../config/mongoConnection");
const data = require("../data");
const validation = require("../validation");
const users = data.userData;
const messages = data.messageData;
const games = data.gameData;
const axios = require("axios");

async function main() {
  try {
    console.log("Seeding database...");
    const db = await dbConnection.connectToDb();
    await db.dropDatabase();
    let url = `https://api.rawg.io/api/games?key=${"b717f19a81194b02b32bc29213664efd"}&page=${1}`;
    const { data } = await axios.get(url);
    //error checking and throw
    let userData = [
      {
        firstname: "Ralf",
        lastname: "Bravey",
        username: "rbravey0",
        password: "ZbRyTwj1!",
      },
      {
        firstname: "Delcina",
        lastname: "Spickett",
        username: "dspickett1",
        password: "v6Yhkg33t1!",
      },
      {
        firstname: "Ferris",
        lastname: "Staining",
        username: "fstaining2",
        password: "GAJrvd3aVP1!",
      },
      {
        firstname: "Jareb",
        lastname: "Pybworth",
        username: "jpybworth3",
        password: "BWVa1dA1!",
      },
      {
        firstname: "Kynthia",
        lastname: "Tinn",
        username: "ktinn4",
        password: "gu3B8a3K1!",
      },
    ];

    //signup
    for (const user of userData) {
      console.log(user.firstname, user.lastname, user.username, user.password);
      await users.createUser(
        user.firstname,
        user.lastname,
        user.username,
        user.password
      );
    }

    await games.createSellingGame(
      userData[0].username,
      data.results[0].id,
      data.results[0].name,
      "$100",
      "New",
      "Hoboken"
    );

    await users.updateUser(
      userData[0].username,
      data.results[0].id,
      data.results[0].name,
      "$100",
      "New",
      "Hoboken"
    );

    await games.createSellingGame(
      userData[0].username,
      data.results[0].id,
      data.results[0].name,
      "$60",
      "Fair",
      "Hoboken"
    );

    await users.updateUser(
      userData[0].username,
      data.results[0].id,
      data.results[0].name,
      "$60",
      "Fair",
      "Hoboken"
    );

    await games.createSellingGame(
      userData[1].username,
      data.results[0].id,
      data.results[0].name,
      "$70",
      "Like New",
      "Hoboken"
    );

    await users.updateUser(
      userData[1].username,
      data.results[0].id,
      data.results[0].name,
      "$70",
      "Like New",
      "Hoboken"
    );

    await games.createSellingGame(
      userData[2].username,
      data.results[0].id,
      data.results[0].name,
      "$80",
      "Like New",
      "Jersey City"
    );

    await users.updateUser(
      userData[2].username,
      data.results[0].id,
      data.results[0].name,
      "$80",
      "Like New",
      "Jersey City"
    );

    await games.createSellingGame(
      userData[0].username,
      data.results[2].id,
      data.results[2].name,
      "$50",
      "Like New",
      "Jersey City"
    );

    await users.updateUser(
      userData[0].username,
      data.results[2].id,
      data.results[2].name,
      "$50",
      "Like New",
      "Jersey City"
    );

    await games.createSellingGame(
      userData[1].username,
      data.results[3].id,
      data.results[3].name,
      "$80",
      "Fair",
      "Union City"
    );

    await users.updateUser(
      userData[1].username,
      data.results[3].id,
      data.results[3].name,
      "$80",
      "Fair",
      "Union City"
    );

    const mockConvo0 = [
      "Hey, I'm interested in buying Grand Theft Auto V. How much are you asking for it?",
      "I'm willing to pay $100 for it.",
      "That's a little too high for me. How about $75?",
      "I can do $80.",
      "Okay, I'll meet you in the middle at $77.50.",
      "Deal! I'll be there in 15 minutes.",
      "Here I am. Where are you?",
      "I'm over here by the park.",
      "I see you. I'm coming over.",
      "Here we go. $77.50 for Grand Theft Auto V.",
      "Thanks! I've been wanting to play this game for a long time.",
      "No problem. Enjoy!",
    ];

    let alt0 = true;
    for (let i = 0; i < mockConvo0.length; i++) {
      if (alt0)
        await messages.addMessage(userData[3], mockConvo0[i], userData[0]);
      else await messages.addMessage(userData[0], mockConvo0[i], userData[3]);
      alt0 = !alt0;
    }

    const mockConvo1 = [
      "Hi, I'm interested in buying Portal 2. How much are you asking for it?",
      "I'm asking $50 for it.",
      "That's a little more than I was hoping to spend. Would you be willing to do $40?",
      "I could do $45.",
      "Okay, I'll meet you in the middle at $42.50.",
      "Deal! I'll be there in 15 minutes.",
      "Great! See you then.",
      "Here I am. Where are you?",
      "I'm over here by the library.",
      "I see you. I'm coming over.",
      "Thanks for the game! I've been wanting to play it for a long time.",
      "No problem! Enjoy! I hope you're not too addicted to it. I know how it can be with video games. I used to play for hours on end, and it started to affect my grades and my relationships. But I've since learned to moderate my gaming time, and I'm much happier for it.",
      "Thanks for the advice. I'll make sure to be careful.",
    ];

    let alt1 = true;
    for (let i = 0; i < mockConvo1.length; i++) {
      if (alt1)
        await messages.addMessage(userData[4], mockConvo1[i], userData[0]);
      else await messages.addMessage(userData[0], mockConvo1[i], userData[4]);
      alt1 = !alt1;
    }

    const mockConvo2 = [
      "Hi, I'm interested in buying Tomb Raider. How much are you asking for it?",
      "I'm asking $80 for it.",
      "That's a little more than I was hoping to spend. Would you be willing to do $70?",
      "I could do $75.",
      "Okay, I'll meet you in the middle at $72.50.",
      "Deal! I'll be there in 15 minutes.",
      "Great! See you then.",
      "Here I am. Where are you?",
      "I'm over here by the library.",
      "I see you. I'm coming over.",
      "Here we go. $72.50 for Tomb Raider.",
      "Thanks for the game! I've been wanting to play it for a long time.",
      "No problem! Enjoy! I hope you're not too addicted to it. I know how it can be with video games. I used to play for hours on end, and it started to affect my grades and my relationships. But I've since learned to moderate my gaming time, and I'm much happier for it.",
      "Thanks for the advice. I'll make sure to be careful.",
      "No problem. So, are you planning to resell the game after you're done playing it?",
      "I'm not sure yet. I might keep it, or I might sell it. It depends on how much I enjoy it.",
      "Well, if you do decide to sell it, let me know. I might be interested in buying it from you.",
      "Okay, I'll keep that in mind. Thanks for the offer.",
      "No problem. Enjoy the game!",
      "I will! Thanks again!",
      "You're welcome!",
      "Hey, I just wanted to let you know that I'm selling Tomb Raider. I'm not playing it as much as I thought I would, so I figured I'd let someone else enjoy it.",
      "Oh, okay. How much are you asking for it?",
      "I'm thinking $60.",
      "That sounds fair. I'll take it.",
      "Great! I'll bring it over tomorrow.",
      "Okay, thanks!",
      "No problem. Have a good night!",
    ];

    let alt2 = true;
    for (let i = 0; i < mockConvo2.length; i++) {
      if (alt2)
        await messages.addMessage(userData[0], mockConvo2[i], userData[1]);
      else await messages.addMessage(userData[1], mockConvo2[i], userData[0]);
      alt2 = !alt2;
    }

    console.log("Done seeding database");
    await dbConnection.closeConnection();
  } catch (e) {
    console.log(e);
  }
}

main().catch((error) => {
  console.error(error);
  return dbConnection.connectToDb().then((db) => {
    return dbConnection.closeConnection();
  });
});
