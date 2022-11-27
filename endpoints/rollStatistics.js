const { ArrayType, FixMeLocation, RedactedFixMe, Enum0 } = require("../types.js");

const { FixMe } = require("../models.js");

/**
 * res_output
 * @param statistics: ArrayType(RedactedFixMe)
 */

/**
 * res_input
 */

let constructStatistics = x => ArrayType(RedactedFixMe).call(null, x);

module.exports = async function process_rollStatistics(res_input, res_output) {
    // TODO: implement
    const fixmes = await FixMe.db().find({}).toArray();
    const statistics = fixmes.map(fixme => ({
        location: fixme.location,
        timesHit: fixme.timesHit,
        visitedByCount: fixme.visitedBy.length,
    }));
    return (res_output = constructStatistics(statistics));
};
