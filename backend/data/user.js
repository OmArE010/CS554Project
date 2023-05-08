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
	if (!user) throw `User not present`;

	user.gamesSelling.push({
		gameId: gameId,
		gameName: gameName,
		price: price,
		condition: condition,
		location: location
	})

	return user;
}

module.exports = {
    createUser, 
    validateUser, 
    getUser,
	updateUser
}