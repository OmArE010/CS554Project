const mongoCollections = require("../config/mongoCollections");
const usersCollection = mongoCollections.users;
const gamesCollection = mongoCollections.games;
const validation = require('../validation');
const axios = require('axios');

const key = 'b717f19a81194b02b32bc29213664efd';

const getGames = async (page) => {
    if(isNaN(page)){
        throw 'page must be a number';
    }
    let url = `https://api.rawg.io/api/games?key=${key}&page=${page}`;
    const { data } = await axios.get(url);
    //error checking and throw
    return data;
}

const getGame = async (id) => {
    let url = `https://api.rawg.io/api/games/${id}?key=${key}`;
    const { data } = await axios.get(url);
    //error checking and throw
    return data;
}

const searchGame = async (page, searchTerm) => {
    let url = `https://api.rawg.io/api/games?key=${key}&page=${page}&search=${searchTerm}`;
    const { data } = await axios.get(url);
    //error checking and throw
    return data;
}

const createSellingGame = async (gameId, gameName) => {

    console.log(gameId, gameName);

    //validation.errorIfNotProperUserName(username, "username");
    let games = await gamesCollection();
    //username = username.toLowerCase().trim();

    let newGame = {
		gameId: gameId,
        // username: username,
        gameName: gameName,
	};

	let insertInfo = await games.insertOne(newGame);

	if (insertInfo.insertedCount === 0) {
		throw `Server Error, User Could not be Created`;
	} else {
		return { gameInserted: true };
	}
}

const getCopies = async (gameId) => {

    let games = await gamesCollection();
    let count = 0;
    let copies = games.find({gameId: gameId});
    if(!copies){
        console.log('not found');
        return 0;
    }
    return copies;

}

module.exports = {
    getGames,
    getGame,
    searchGame,
    createSellingGame,
    getCopies
}