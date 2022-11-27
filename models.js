const {ArrayType, FixMeLocation, RedactedFixMe, Enum0} = require("./types.js");
const { ObjectId } = require("mongodb");
module.exports = {};
let FixMe = {
	'timesHit': arg => Number.call(null, arg),
	'visitedBy': arg => ArrayType(String).call(null, arg),
	'location': arg => FixMeLocation.call(null, arg),
	aliasedName: {},
	staticProperties: ["call", "db", "findById", "staticProperties", "forEach", "aliasedName"],
	call(_, value) {
		let obj = {};
		for (property in FixMe)
			if ((!FixMe.staticProperties.includes(property))) {
				if (FixMe.hasOwnProperty(property))
					obj[property] = FixMe[property](value[property]);
				if (FixMe.aliasedName[property])
						obj[property] = FixMe[property](value[FixMe.aliasedName[property]]);
			}
		return obj;
	},
	forEach(self, callback) {
		for (property in FixMe)
			if ((!FixMe.staticProperties.includes(property)) && self.hasOwnProperty(property))
				callback(property, self[property], self);
	},
	db() { return db.collection("FixMe") },
	async findById(id) {
		return await db.collection("FixMe").findOne({
			$and:
				[
					{_id: new ObjectId(id)},
					...(Array.prototype.slice.call(arguments, 1))
				]
		});
	},
};
module.exports["FixMe"] = FixMe

