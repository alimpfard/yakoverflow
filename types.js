module.exports = {};
let FixMeLocation = {
	'column': arg => Number.call(null, arg),
	'path': arg => String.call(null, arg),
	'lineNumber': arg => Number.call(null, arg),
	'lastChangeHash': arg => String.call(null, arg),
	aliasedName: {},
	staticProperties: ["call", "staticProperties", "forEach", "aliasedName"],
	call(_, value) {
		let obj = {};
		for (property in FixMeLocation)
			if ((!FixMeLocation.staticProperties.includes(property))) {
				if (FixMeLocation.hasOwnProperty(property))
					obj[property] = FixMeLocation[property](value[property]);
				if (FixMeLocation.aliasedName[property])
						obj[property] = FixMeLocation[property](value[FixMeLocation.aliasedName[property]]);
			}
		return obj;
	},
	forEach(self, callback) {
		for (property in FixMeLocation)
			if ((!FixMeLocation.staticProperties.includes(property)) && self.hasOwnProperty(property))
				callback(property, self[property], self);
	}
};
module.exports["FixMeLocation"] = FixMeLocation

let RedactedFixMe = {
	'visitedByCount': arg => Number.call(null, arg),
	'location': arg => FixMeLocation.call(null, arg),
	'timesHit': arg => Number.call(null, arg),
	aliasedName: {},
	staticProperties: ["call", "staticProperties", "forEach", "aliasedName"],
	call(_, value) {
		let obj = {};
		for (property in RedactedFixMe)
			if ((!RedactedFixMe.staticProperties.includes(property))) {
				if (RedactedFixMe.hasOwnProperty(property))
					obj[property] = RedactedFixMe[property](value[property]);
				if (RedactedFixMe.aliasedName[property])
						obj[property] = RedactedFixMe[property](value[RedactedFixMe.aliasedName[property]]);
			}
		return obj;
	},
	forEach(self, callback) {
		for (property in RedactedFixMe)
			if ((!RedactedFixMe.staticProperties.includes(property)) && self.hasOwnProperty(property))
				callback(property, self[property], self);
	}
};
module.exports["RedactedFixMe"] = RedactedFixMe

let Enum0 = {
	choices: ["index.html"],
	call(_, value) {
		if (Enum0.choices.includes(value))
			return value;
		else
			return undefined;
	}
};
module.exports["Enum0"] = Enum0
function ArrayType(inner) {
	return {
		call(_, value) {
			return Array.prototype.slice.call(value).map(x => inner.call(null, x));
		}
	};
};
module.exports["ArrayType"] = ArrayType;
