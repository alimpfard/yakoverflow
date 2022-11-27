const {ArrayType, FixMeLocation, RedactedFixMe, Enum0} = require("../types.js");

const {FixMe} = require("../models.js");

/**
 * Get rolls by me
 */
/**
 * res_output
 * @param rolls: ArrayType(RedactedFixMe)
 */

/**
 * res_input
 */

let constructRolls = x => (ArrayType(RedactedFixMe)).call(null, x);
module.exports = async function action_rollsByMe_0(res, req, res_output, res_input) {
    const fixmes = await FixMe.db().find({
		visitedBy: {
			$elemMatch: {
				$eq: req.ip
			}
		}
	}).toArray();
    const rolls = fixmes.map(fixme => ({
        location: fixme.location,
        timesHit: fixme.timesHit,
        visitedByCount: fixme.visitedBy.length,
    }));
	res_output.rolls = constructRolls(rolls);
	return true;
}
