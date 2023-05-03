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

const searchGame = async (searchTerm) => {
    let url = `https://api.rawg.io/api/games?key=${key}&search=${searchTerm}`;
    const { data } = await axios.get(url);
    //error checking and throw
    return data;
}

module.exports = {
    getGames,
    getGame,
    searchGame
}