const express = require('express');
const router = express.Router();
const axios = require('axios');
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {}); 
const data = require('../data');
const users = data.userData;
const games = data.gameData;

router
    .route('/:pagenum')
    .get(async (req, res) => {
        try{
            if(!req.params.pagenum || req.params.pagenum < 1 || isNaN(req.params.pagenum)){
                console.log(req.params.pagenum);
                throw "pagenum invalid";
            }
        }catch(e){
            return res.status(400).json({error: e});
        }
        try{
            let exists = await client.hExists('page', `${req.params.pagenum}`);
            if(exists){
                let info = await client.hGet('page',`${req.params.pagenum}`);
                res.status(200).json(JSON.parse(info));
            }
            else{
                let info = await games.getGames(req.params.pagenum);
                await client.hSet('page', `${req.params.pagenum}`, JSON.stringify(info));
                res.status(200).json(info);
            }
        }catch(e){
            res.status(404).json({error: e});
        }
    })

router
    .route('/search/:page/:searchTerm')
    .get(async (req, res) => {
        console.log("here");
        try{
            console.log(req.params.searchTerm);
            let info = await games.searchGame(req.params.page, req.params.searchTerm);
            res.status(200).json(info);
        }catch(e){
            res.status(404).json({error: e});
        }
    })

router
    .route('/game-details/:id')
    .get(async (req, res) => {
        try{
            const exists = await client.hExists('game', `${req.params.id}`);
            if(exists){
                let info = await client.hGet('game',`${req.params.id}`);
                res.status(200).json(JSON.parse(info));
            }
            else{
                let info = await games.getGame(req.params.id);
                await client.hSet('game', `${req.params.id}`, JSON.stringify(info));
                res.status(200).json(info);
            }
        }catch(e){
            res.status(404).json({error: e});
        }
    })

module.exports = router;