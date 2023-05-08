const mongoCollections = require("../config/mongoCollections");
const messagesCollection = mongoCollections.messages;
const usersCollection = mongoCollections.users;

const addMessage = async (sender, message, receiver) => {
  console.log(`data: ${sender} ${message} ${receiver}`);

  message = message.trim();
  console.log(`before messages data: ${message}`);

  // let users = await usersCollection();
  let messages = await messagesCollection();

  // let senderCheck = await users.findOne({ username: sender });
  // let receiverCheck = await users.findOne({ username: receiver });

  // if (!senderCheck) {
  // 	throw `invalid sender`;
  // }
  // if (!receiverCheck) {
  // 	throw `invalid receiver`;
  // }

  let newMessage = {
    sender: sender,
    message: message,
    receiver: receiver,
  };
  console.log(`data newMessage: ${newMessage}`);
  let insertInfo = await messages.insertOne(newMessage);

  if (insertInfo.insertedCount === 0) {
    throw `Server Error, Message Could not be Created`;
  } else {
    return { messageInserted: true };
  }
};

const getAllMessages = async () => {
  let messages = await messagesCollection();
  const allMessages = await messages.find().toArray();
  let result = [];
  for (let i = 0; i < allMessages.length; i++) result.push(allMessages[i]);
  return result;
};

module.exports = {
  addMessage,
  getAllMessages,
};
