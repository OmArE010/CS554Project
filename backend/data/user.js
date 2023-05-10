const {v4: uuidv4} = require('uuid');
const mongoCollections = require("../config/mongoCollections");
const usersCollection = mongoCollections.users;
const bcrypt = require('bcrypt');
const validation = require('../validation');

const saltRounds = 4;

const createUser = async (
    firstname,
    lastname,
    username,
    password
) => {
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
		gamesSelling: []
	};

	let insertInfo = await users.insertOne(newUser);

	if (insertInfo.insertedCount === 0) {
		throw `Server Error, User Could not be Created`;
	} else {
		return { userInserted: true };
	}
}

const validateUser = async (username, password) => {
    validation.errorIfNotProperUserName(username, "username");
    validation.errorIfNotProperPassword(password, "password");

    let users = await usersCollection();
    username = username.toLowerCase();
	let user = await users.findOne({ username: username });
	if (!user) throw `Either the username or password is invalid`;

	if (await bcrypt.compare(password, user.password)) {
		return { authenticatedUser: true, username: user.username  };
	} else {
		throw `Either the username or password is invalid`;
	}
}

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
		throw "could not update recipe successfully";
	  }

	return getUser(username);
}

const getSelling = async(username) => {
	validation.errorIfNotProperUserName(username, "username");
	let users = await usersCollection();
	username = username.toLowerCase().trim();
	let user = users.findOne({username: username});
	return user.gamesSelling;
}


const getallSellers = async () => {
	sellers = [];
	let userscollection = await usersCollection();
	let allusers = await userscollection.find({}).toArray();
	for (let i = 0; i < allusers.length; i++) {
		if(allusers[i].gamesSelling.length> 1){
			sellers.push(allusers[i]);
		}
	}

	return sellers;
}

const getSellersforgame = async (gameId) => {
	gamessellers = [];
	let userscollection = await getallSellers();
		for (let i = 0; i < userscollection.length; i++) {
			for(let j = 0; j< userscollection[i].gamesSelling.length; j++){
				if(userscollection[i].gamesSelling[j].gameId == gameId){
					gamessellers.push(userscollection[i]);
				}
			}
		}
	return gamessellers;
}


module.exports = {
    createUser, 
    validateUser, 
    getUser,
	updateUser,
	getSelling,
	getallSellers,
	getSellersforgame
	
}
