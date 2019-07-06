export const checkValidity = (value, rules) => { //rules and value are sent in from ContactData/Auth containers, rules=validation,
	let isValid = true;
	if (rules.required) {
		isValid = value.trim() !== "" && isValid;
	};
	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	};
	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	};
	if (rules.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test(value) && isValid;
	};
	if (rules.isURL) {
		const pattern = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
		isValid = pattern.test(value) && isValid;
	}
	if (rules.isNumeric) {
		const pattern = /^\d+$/;
		isValid = pattern.test(value) && isValid;
	};
	return isValid;
}