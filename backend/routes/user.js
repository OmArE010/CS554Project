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
    .route('/login')
    .post('/', async (req, res) => {

    });

router
    .route('/logout')
    .get('/', async (req, res) =>
    {
        
    });

router
    .route('/signup')
    .post('/', async (req, res) => {

    });


module.exports = router;