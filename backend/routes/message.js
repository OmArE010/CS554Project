const express = require("express");
const router = express.Router();
const axios = require("axios");
const redis = require("redis");
const client = redis.createClient();
client.connect().then(() => {});
const data = require("../data");
const users = data.userData;
const messages = data.messageData;

router
  .route("/")
  .get(async (req, res) => {
    try {
      //   const cachedChat = await client.sMembers("messages");
      //   res.status(200).json(JSON.parse(cachedChat));

      const fetchAllMessages = await messages.getAllMessages();
      res.status(200).json(fetchAllMessages);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  })
  .post(async (req, res) => {
    try {
      console.log(req.body);
      const { sender, message, receiver } = req.body;
      const newMessage = await messages.addMessage(sender, message, receiver);
      //   client.sAdd("messages", newMessage);
      res.status(200).json(newMessage);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  });

module.exports = router;
