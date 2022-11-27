var express = require("express");
var app = express();

db = null;
dbsession = null;
const config = require("./config.js");
const MongoClient = require("mongodb").MongoClient;

const process_rollStatistics = require("./endpoints/rollStatistics.js");
const process_index = require("./endpoints/index.js");
const action_index_0 = require("./actions/index-action0.js");
const process_rollsByMe = require("./endpoints/rollsByMe.js");
const action_rollsByMe_0 = require("./actions/rollsByMe-action0.js");
const process_roll = require("./endpoints/roll.js");
const action_roll_0 = require("./actions/roll-action0.js");
const action_roll_1 = require("./actions/roll-action1.js");
const action_roll_2 = require("./actions/roll-action2.js");

const {ArrayType, FixMeLocation, RedactedFixMe, Enum0} = require("./types.js");
const {FixMe} = require("./models.js");

function getOrFail(type, obj, prop, _default) {
	let oprop = obj[prop];
	if ((typeof(oprop) === "undefined" || oprop === null) && typeof(_default) === "undefined") {
		throw new Error(`missing argument ${prop}`);
	}
	if (typeof(oprop) === "undefined" || oprop === null)
		return _default;
	oprop = type.call(null, oprop);
	if ((typeof(oprop) === "undefined" || oprop === null) && typeof(_default) === "undefined") {
		throw new Error(`wrong type for argument ${prop}`);
	}
	return (typeof(oprop) === "undefined" || oprop === null) ? _default : oprop;
}
app.get("/index.html", async (req, res) => {
	res.redirect("/index?res=index.html");
});
app.get("/", async (req, res) => {
	res.redirect("/index?res=index.html");
});
app.post("/rollStatistics", async (req, res) => {
	var bodyStr = "";
	req.on("data", function(chunk) { 
		bodyStr += chunk.toString();
	});
	req.on("end", async function() {
		bodyStr = bodyStr
		let ok = false, handled = false, res_input = null, res_output = null;
		let jsondec = JSON.parse(bodyStr);
		let total_failure = {fail_early: false, action_handled_response: false};
		try {
			res_input = {
			};

			res_output = {
				'statistics': null /* ArrayType(RedactedFixMe) */,
			};

			(total_failure.action_handled_response ? (x=>{console.log(x)}) : x=>{res.send(x)})(await process_rollStatistics(res_input, res_output));
			ok = true;

		} catch(e) {
			console.error(e);
			ok = false;
			if (!total_failure.action_handled_response) {
				handled = true;
				res.status(500).send({_error: e.toString(), ...res_output});
			} else {
				handled = true;
			}
		} finally {
			if (!ok && !handled) res.status(500).send(res_output);
			}

});
	});
app.get("/index", async (req, res) => {
	let ok = false, handled = false, res_input = null, res_output = null;
		let total_failure = {fail_early: false, action_handled_response: false};
		try {
			res_input = {
				'res': getOrFail(Enum0, req.query, 'res', undefined),
			};

			res_output = {} /* String */;
			if (await action_index_0(res, req, res_output, res_input, total_failure) &&
			    true) {
				(total_failure.action_handled_response ? (x=>{console.log(x)}) : x=>{res.send(x)})(await process_index(res_input, res_output));
				ok = true;
			}
			else {
				ok = false;
			}
			handled = total_failure.action_handled_response;
		} catch(e) {
			console.error(e);
			ok = false;
			if (!total_failure.action_handled_response) {
				handled = true;
				res.status(500).send({_error: e.toString(), ...res_output});
			} else {
				handled = true;
			}
		} finally {
			if (!ok && !handled) res.status(500).send(res_output);
			}
	});
app.post("/rollsByMe", async (req, res) => {
	var bodyStr = "";
	req.on("data", function(chunk) { 
		bodyStr += chunk.toString();
	});
	req.on("end", async function() {
		bodyStr = bodyStr
		let ok = false, handled = false, res_input = null, res_output = null;
		let jsondec = JSON.parse(bodyStr);
			dbsession.startTransaction();
		let total_failure = {fail_early: false, action_handled_response: false};
		try {
			res_input = {
			};

			res_output = {
				'rolls': null /* ArrayType(RedactedFixMe) */,
			};

			if (await action_rollsByMe_0(res, req, res_output, res_input, total_failure) &&
			    true) {
				(total_failure.action_handled_response ? (x=>{console.log(x)}) : x=>{res.send(x)})(await process_rollsByMe(res_input, res_output));
				ok = true;
			}
			else {
				ok = false;
			}
			handled = total_failure.action_handled_response;
		} catch(e) {
			console.error(e);
			ok = false;
			if (!total_failure.action_handled_response) {
				handled = true;
				res.status(500).send({_error: e.toString(), ...res_output});
			} else {
				handled = true;
			}
		} finally {
			if (ok && !total_failure.fail_early)
				await dbsession.commitTransaction();
			else await dbsession.abortTransaction();
			if (!ok && !handled) res.status(500).send(res_output);
			}
	});
	});
app.post("/roll", async (req, res) => {
	var bodyStr = "";
	req.on("data", function(chunk) { 
		bodyStr += chunk.toString();
	});
	req.on("end", async function() {
		bodyStr = bodyStr
		let ok = false, handled = false, res_input = null, res_output = null;
		let jsondec = JSON.parse(bodyStr);
			dbsession.startTransaction();
		let total_failure = {fail_early: false, action_handled_response: false};
		try {
			res_input = {
			};

			res_output = {
				'text': null /* String */,
				'location': null /* FixMeLocation */,
				'commitHash': null /* String */,
			};

			if (await action_roll_0(res, req, res_output, res_input, total_failure) &&
			    await action_roll_1(res, req, res_output, res_input, total_failure) &&
			    await action_roll_2(res, req, res_output, res_input, total_failure) &&
			    true) {
				(total_failure.action_handled_response ? (x=>{console.log(x)}) : x=>{res.send(x)})(await process_roll(res_input, res_output));
				ok = true;
			}
			else {
				ok = false;
			}
			handled = total_failure.action_handled_response;
		} catch(e) {
			console.error(e);
			ok = false;
			if (!total_failure.action_handled_response) {
				handled = true;
				res.status(500).send({_error: e.toString(), ...res_output});
			} else {
				handled = true;
			}
		} finally {
			if (ok && !total_failure.fail_early)
				await dbsession.commitTransaction();
			else await dbsession.abortTransaction();
			if (!ok && !handled) res.status(500).send(res_output);
			}
	});
	});
MongoClient.connect(config.mongo_addr, {useNewUrlParser: true}, (err, client) => {
	if (err) return console.log(err);
	dbsession = client.startSession();
	db = client.db(config.database);
	app.listen(config.port, () => console.log("App listening on port " + config.port));
});
