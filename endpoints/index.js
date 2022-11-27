const {ArrayType, FixMeLocation, Enum0} = require("../types.js");

const {FixMe} = require("../models.js");

const fs = require("fs").promises;

/**
 * res_output
 * = String
 */

/**
 * res_input
 * @param res: Enum0
 */
module.exports = async function process_index(res_input, res_output) {
	return fs.readFile(res_input.res, 'utf8');
}