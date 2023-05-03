function errorIfNotProperString(val, variableName) {
	//
	if (val === undefined) {
		throw `${variableName || 'provided variable'} is not present`;
	}
	if (typeof val !== 'string') {
		throw `${variableName || 'provided variable'} is not a string`;
	}
	let str = val.trim();
	if (str.length === 0) {
		throw `${variableName || 'provided variable'} is an empty string`;
	}
}

function errorIfNotProperArray(val, variableName) {
	if (val === undefined) {
		throw `${variableName || 'Input Array'} not provided`;
	}
	if (!Array.isArray(val)) {
		throw `${variableName || 'Provided Variable'} is not an Array`;
	}

	if (val.length === 0) {
		throw `${variableName || 'Provided Array'} is Empty`;
	}
}

function errorIfStringHasSpecialCharacter(val, variableName) {
	for (let x of val) {
		let i = x.charCodeAt(0);
		if (
			!(
				(i >= 48 && i <= 57) || //Numbers
				(i >= 65 && i <= 90) || //Upper Case
				(i >= 97 && i <= 122) || //Lower Case
				false
			)
		) {
			throw `${variableName || 'Input String'} has special character`;
		}
	}
}

function errorIfStringHasNumber(val, variableName) {
	for (let x of val) {
		let i = x.charCodeAt(0);
		if (
			i >= 48 &&
			i <= 57 //Numbers
		) {
			throw `${variableName || 'Input String'} has numbers`;
		}
	}
}

function errorIfStringIsNotNumber(val, variableName, errorMessage) {
	errorIfNotProperString(val);
	if (val == undefined) {
		if (errorMessage) throw errorMessage;
		else throw `${variableName || 'Input String'} is not number`;
	}
	for (let x of val) {
		let i = x.charCodeAt(0);
		if (
			!(i >= 48 && i <= 57) //Numbers
		) {
			if (errorMessage) throw errorMessage;
			else throw `${variableName || 'Input String'} is not number`;
		}
	}
}

function errorIfNotProperUserName(val, variableName) {
	//
	val = val.trim();
	errorIfNotProperString(val, variableName);
	errorIfStringHasSpecialCharacter(val, variableName);

	if (val.length < 4) {
		throw `${variableName || 'Input String'} is short`;
	}
}

function errorIfNotProperPassword(val, variableName) {
	//
	val = val.trim();
	errorIfNotProperString(val, variableName);

	if (val.length < 6) {
		throw `${variableName || 'Input String'} is short`;
	}

	//upper case
	let upper_chr_present = false;

	for (let x of val) {
		let i = x.charCodeAt(0);
		if (
			(i >= 65 && i <= 90) || //Upper Case
			false
		) {
			upper_chr_present = true;
			break;
		}
	}

	if (!upper_chr_present) {
		throw `${variableName || 'Input String'} does not contain upper case`;
	}

	//number
	let num_chr_present = false;

	for (let x of val) {
		let i = x.charCodeAt(0);
		if (
			(i >= 48 && i <= 57) || //Numbers
			false
		) {
			num_chr_present = true;
			break;
		}
	}

	if (!num_chr_present) {
		throw `${variableName || 'Input String'} does not contain a number`;
	}

	if (val.length < 6) {
		throw `${variableName || 'Input String'} is short`;
	}

	//space
	if (val.indexOf(' ') >= 0) {
		throw `${variableName || 'Input String'} contains space`;
	}

	//special charcter
	let special_chr_present = false;

	for (let x of val) {
		let i = x.charCodeAt(0);
		if (
			!(
				(i >= 48 && i <= 57) || //Numbers
				(i >= 65 && i <= 90) || //Upper Case
				(i >= 97 && i <= 122) || //Lower Case
				false
			)
		) {
			special_chr_present = true;
		}
	}

	if (!special_chr_present) {
		throw `${
			variableName || 'Input String'
		} does not contains special character`;
	}
}

function errorIfNotProperID(val, variableName) {
	//
	// errorIfNotProperString(val, variableName);
	val = val.trim();
	if (!ObjectId.isValid(val)) throw `${variableName} is an invalid object ID`;
}

function errorIfNotProperDateTime(val, variableName) {
	errorIfNotProperString(val, variableName);
	val = val.trim();

	let temp = Date.parse(val);
	if (!temp) throw `Not Proper DateTime `;

	let currentDateTimeString = Date.parse(new Date().toLocaleString('est'));

	if (temp < currentDateTimeString) throw `Not Proper DateTime`;
}

function errorIfNotProperName(val, variableName) {
	//
	errorIfNotProperString(val, variableName);
	val = val.trim();

	for (let x of val) {
		let i = x.charCodeAt(0);
		if (
			!(
				(i >= 65 && i <= 90) || //Upper Case
				(i >= 97 && i <= 122) || //Lower Case
				i == 32 || //Space
				false
			)
		) {
			throw `${variableName || 'Input String'} is not Proper Name`;
		}
	}
}
module.exports = {
	errorIfNotProperString,
	errorIfNotProperPassword,
	errorIfNotProperArray,
	errorIfNotProperUserName,
	errorIfStringHasSpecialCharacter,
	errorIfStringHasNumber,
	errorIfStringIsNotNumber,
	errorIfNotProperID,
	errorIfNotProperDateTime,
	errorIfNotProperName,
};
