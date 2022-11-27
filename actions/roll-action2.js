const { ArrayType, FixMeLocation, Enum0 } = require("../types.js");

const { FixMe } = require("../models.js");

/**
 * Update fixme database
 */
/**
 * res_output
 * @param location: FixMeLocation
 * @param commitHash: String
 * @param text: String
 */

/**
 * res_input
 */

// type FixMeLocation [
//     string path,
//     int lineNumber,
//     int column,
//     string lastChangeHash
// ].

let constructLocation = x => FixMeLocation.call(null, x);
let constructCommitHash = x => String.call(null, x);
module.exports = async function action_roll_2(res, req, res_output, res_input) {
    await FixMe.db().updateOne(
        {
            location: res_output.location,
        },
        {
			// timesHit++
            $inc: {
                timesHit: 1,
            },
			// add req.ip to visitedBy (as a set)
			$addToSet: {
				visitedBy: req.ip
			},
        },
        { upsert: true }
    );
    return true;
};
