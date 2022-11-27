const {ArrayType, FixMeLocation, Enum0} = require("../types.js");

const {FixMe} = require("../models.js");

/**
 * Set content type
 */
/**
 * res_output
 * = String
 */

/**
 * res_input
 * @param res: Enum0
 */

module.exports = async function action_index_0(res, req, res_output, res_input) {
	res.type(res_input.res.includes('.js') ? 'text/javascript' : 'text/html')
	return true;
}
