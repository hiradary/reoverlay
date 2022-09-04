'use strict';
module.exports = (input, n) => {
	if (!Array.isArray(input)) {
		throw new TypeError(`Expected an array, got ${typeof input}`);
	}

	const x = input.slice();
	const num = typeof n === 'number' ? n : 0;

	return x.splice(-num % x.length).concat(x);
};
