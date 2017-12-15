const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModels');
const { mysecret } = require('../../config');
const SaltRounds = 11;

const STATUS_USER_ERROR = 422;

const sendUserError = (err, res) => {
	res.status(STATUS_USER_ERROR);
	if (err && err.message) {
		res.json({ message: err.message, stack: err.stack });
	} else {
		res.json({ error: err });
	}
};

const authenticate = (req, res, next) => {
	const token = req.get('Authorization');
	if (token) {
		jwt.verify(token, mysecret, (err, decoded) => {
			if (err) return res.status(422).json(err);
			req.decoded = decoded;
			next();
		});
	} else {
		return res.status(403).json({
			error: 'No token provided, must be set on the Authorization Header'
		});
	}
};

const encryptUserPW = (req, res, next) => {
	const { password, username } = req.body;

	if (!password) {
		sendUserError('Password is required!', res);
		return;
	}

	if (!username) {
		sendUserError('username is required!', res);
		return;
	}

	bcrypt
		.hash(password, 11)
		.then(pw => {
			req.user = { username: username, password: pw };
			next();
		})
		.catch(err => {
			throw new Error('Could not hash password');
		});

	// https://github.com/kelektiv/node.bcrypt.js#usage
	// TODO: Fill this middleware in with the Proper password encrypting, bcrypt.hash()
	// Once the password is encrypted using bcrypt, you'll need to save the user the DB.
	// Once the user is set, take the savedUser and set the returned document from Mongo on req.user
	// call next to head back into the route handler for encryptUserPW
};

const compareUserPW = (req, res, next) => {
	const { username, password } = req.body;
	// https://github.com/kelektiv/node.bcrypt.js#usage
	// TODO: Fill this middleware in with the Proper password comparing, bcrypt.compare()
	// You'll need to find the user in your DB
	// Once you have the user, you'll need to pass the encrypted pw and the plaintext pw to the compare function
	// If the passwords match set the username on `req` ==> req.username = user.username; and call next();
};

module.exports = {
	authenticate,
	encryptUserPW,
	compareUserPW
};
