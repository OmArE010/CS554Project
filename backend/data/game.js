const mongoCollections = require("../config/mongoCollections");
const usersCollection = mongoCollections.users;
const gamesCollection = mongoCollections.games;
const validation = require('../validation');
const axios = require('axios');
var ObjectId = require('mongodb').ObjectId;

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

const createSellingGame = async (username, gameId, gameName, price, condition, location) => {

    console.log(gameId, gameName);

    //validation.errorIfNotProperUserName(username, "username");
    let games = await gamesCollection();
    //username = username.toLowerCase().trim();

    let newGame = {
        username: username,
		gameId: gameId,
        gameName: gameName,
        price: price,
        condition: condition,
        location: location
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
    let copies = await games.count({gameId: Number(gameId)});
    if(!copies){
        return 0;
    }
    return copies;

}

const deleteBuyGame = async (gameId) => {
    let games = await gamesCollection();
    console.log(gameId);
    let deleteInfo = await games.deleteOne({_id:new ObjectId(gameId.id)});
    if (deleteInfo.deletedCount === 0) {
        throw `Server Error, User Could not be Created`;
    } else {
        return { gameDeleted: true };
    }

}

module.exports = {
    getGames,
    getGame,
    searchGame,
    createSellingGame,
    getCopies,
	deleteBuyGame
}
