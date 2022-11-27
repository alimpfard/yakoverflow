const { ArrayType, FixMeLocation, Enum0 } = require("../types.js");

const { FixMe } = require("../models.js");

const { simpleGit } = require("simple-git");

const { serenityRepositoryPath, serenityRepositoryRemote } = require("../config.js");
const fs = require("fs").promises;

/**
 * Update SerenityOS/serenity checkout
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

let constructLocation = x => FixMeLocation.call(null, x);
let constructCommitHash = x => String.call(null, x);
module.exports = async function action_roll_0(res, req, res_output, res_input) {
    let fake = false;
    try {
        await fs.mkdir(serenityRepositoryPath, { recursive: true });
        fake = true;
    } catch {}

    const git = simpleGit(serenityRepositoryPath);
    if (
        !(await fs
            .access(serenityRepositoryPath + "/.git", fs.constants.F_OK)
            .then(() => true)
            .catch(() => false))
    ) {
        await git.clone(serenityRepositoryRemote, ".", ["--depth", "1"]);
    } else {
        await git.pull(undefined, "master");
    }

    await git.pull(undefined, "master");

    let commitHash = await git.revparse(["HEAD"]);
    res_output.commitHash = constructCommitHash(commitHash);
    res_input.git = git;

    return true;
};
