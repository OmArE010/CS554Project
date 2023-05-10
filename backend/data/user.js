const { v4: uuidv4 } = require("uuid");
const mongoCollections = require("../config/mongoCollections");
const usersCollection = mongoCollections.users;
const bcrypt = require("bcrypt");
const validation = require("../validation");
var ObjectId = require('mongodb').ObjectId;

const saltRounds = 4;

const createUser = async (firstname, lastname, username, password) => {
  validation.errorIfNotProperName(firstname, "firstname");
  validation.errorIfNotProperName(lastname, "lastname");
  validation.errorIfNotProperUserName(username, "username");
  validation.errorIfNotProperPassword(password, "password");

  firstname = firstname.trim().toLowerCase();
  lastname = lastname.trim().toLowerCase();
  username = username.trim().toLowerCase();
  password = password.trim();

  let users = await usersCollection();

  let userCheck = await users.findOne({ username: username });

  if (userCheck) {
    throw `there is already a user with that username`;
  }

  let hashed_password = await bcrypt.hash(password, saltRounds);

  let newUser = {
    username: username,
    firstname: firstname,
    lastname: lastname,
    password: hashed_password,
    gamesSelling: [],
  };

  let insertInfo = await users.insertOne(newUser);

  if (insertInfo.insertedCount === 0) {
    throw `Server Error, User Could not be Created`;
  } else {
    return { userInserted: true };
  }
};

const validateUser = async (username, password) => {
  validation.errorIfNotProperUserName(username, "username");
  validation.errorIfNotProperPassword(password, "password");

  let users = await usersCollection();
  username = username.toLowerCase();
  let user = await users.findOne({ username: username });
  // console.log(user);
  if (!user) throw `Either the username or password is invalid`;

  if (await bcrypt.compare(password, user.password)) {
    return user;
  } else {
    throw `Either the username or password is invalid`;
  }
};

const getUser = async (username) => {
  validation.errorIfNotProperUserName(username, "username");

  let users = await usersCollection();
	username = username.toLowerCase().trim();
	let user = await users.findOne({ username: username });
	if (!user) throw `User not present`;

	return user;
}

const updateUser = async (username, gameId, gameName, price, condition, location) => {
	validation.errorIfNotProperUserName(username, "username");
	let users = await usersCollection();
	username = username.toLowerCase().trim();
	let user = await users.findOne({ username: username });
	console.log(user);
	if (!user) throw `User not present`;

	let updatedGamesSelling = ({
		id: uuidv4(),
		gameId: gameId,
		gameName: gameName,
		price: price,
		condition: condition,
		location: location
	});
	const updatedInfo = await users.updateOne({username: username}, {$push: {gamesSelling: updatedGamesSelling}});

	if(updatedInfo.modifiedCount === 0 && !updatedInfo.matchedCount){
		throw "could not update user successfully";
	  }

	return getUser(username);
}

const getSelling = async(username) => {
	validation.errorIfNotProperUserName(username, "username");
	let users = await usersCollection();
	username = username.toLowerCase().trim();
	let user = await users.findOne({username: username});
	console.log(user);
	return user.gamesSelling;
}

const getallSellers = async () => {
	sellers = [];
	let userscollection = await usersCollection();
	let allusers = await userscollection.find({}).toArray();
	for (let i = 0; i < allusers.length; i++) {
		if(allusers[i].gamesSelling.length>= 1){
			sellers.push(allusers[i]);
		}
	}

	return sellers;
}

const getSellersforgame = async (gameId) => {
	gamessellers = [];
	answers = [];
	let userscollection = await getallSellers();
	console.log(userscollection);
		for (let i = 0; i < userscollection.length; i++) {
			for(let j = 0; j < userscollection[i].gamesSelling.length; j++){
				console.log(typeof(userscollection[i].gamesSelling[j].gameId));
				console.log(typeof(gameId));
				if(userscollection[i].gamesSelling[j].gameId == gameId){
					gamessellers.push(userscollection[i].username);
					let prices = await getPrices(userscollection[i].username, gameId);
					answers.push(prices);
				}
				break;
			}
		}
		//answers = answers.flat(1);
	console.log(answers);
	return answers;
}

const getPrices = async(username, gameId) => {
	let prices = [];
	validation.errorIfNotProperUserName(username, "username");
	let users = await usersCollection();
	username = username.toLowerCase().trim();
	let user = await users.findOne({username: username});
	console.log(user);
	for (let i = 0; i < user.gamesSelling.length; i ++){
		if(user.gamesSelling[i].gameId == gameId){
			//prices[user.gamesSelling[i].id] = [user.gamesSelling[i].gameName, user.gamesSelling[i].price];
			prices.push({seller: username, id: user.gamesSelling[i].id, name: user.gamesSelling[i].gameName, price: user.gamesSelling[i].price});
		}
	}
	return prices;
}

// const getPrices = async(usernames, gameId) => {
// 	for (let i = 0 ; i < usernames.length; i++){
// 		let prices = [];
// 		//validation.errorIfNotProperUserName(usernames[i], "username");
// 		let users = await usersCollection();
// 		let username = usernames[i].toLowerCase().trim();
// 		let user = await users.findOne({username: username});
// 		console.log(user);
// 		for (let i = 0; i < user.gamesSelling.length; i ++){
// 			if(user.gamesSelling[i].gameId == gameId){
// 				//prices[user.gamesSelling[i].id] = [user.gamesSelling[i].gameName, user.gamesSelling[i].price];
// 				prices.push({seller: username, id: user.gamesSelling[i].id, name: user.gamesSelling[i].gameName, price: user.gamesSelling[i].price});
// 			}
// 		}
// 	}
// 	return prices;
// }


//delete game from selling
const deletesellingGame = async (username, gameId) => {
	console.log(username, gameId);
	//validation.errorIfNotProperUserName(username, "username");
	let users = await usersCollection();
	// let usersellingid = await users.findOne({"newUser.gamesSelling": gameId});
	// if(!usersellingid){
	// 	throw `game not found`;
	// }
	let deleteuser =  users.updateOne({username: username}, {$pull: {gameSelling: {_id:new ObjectId(gameId)}}});
}

module.exports = {
    createUser, 
    validateUser, 
    getUser,
	updateUser,
	getSelling,
	getallSellers,
	getSellersforgame,
	getPrices,
	deletesellingGame
	
}
