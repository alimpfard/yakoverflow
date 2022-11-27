const { ArrayType, FixMeLocation, Enum0 } = require("../types.js");

const { FixMe } = require("../models.js");

const { serenityRepositoryPath } = require("../config.js");
const fs = require("fs").promises;

const { simpleGit } = require("simple-git");

/**
 * Pull random fixme
 */
/**
 * res_output
 * @param location: FixMeLocation
 * @param commitHash: String
 * @param text: String
 */

/**
 * res_input
 * @param git: SimpleGit
 */

let constructLocation = x => FixMeLocation.call(null, x);
let constructCommitHash = x => String.call(null, x);
const GIT_GREP_REGEX = /([^:]+):(\d+):(\d+):\s*(.*)/;

module.exports = async function action_roll_1(res, req, res_output, res_input) {
    const git = res_input.git;
    const results = (
        await git.raw([
            "grep",
            "-e",
            "\\(FIXME\\|TODO\\):",
            "--ignore-case",
            "--line-number",
            "--column",
            "AK",
            "Base",
            "Userland",
            "Kernel",
        ])
    ).split("\n");

    // Find a random one
    const result = results[Math.floor(Math.random() * results.length)];

    // Parse it (format = GIT_GREP_REGEX)
    const match = result.match(GIT_GREP_REGEX);
    if (!match) {
        throw new Error("Failed to parse grep result");
    }

    const [_, file, line, column, message] = match;
    let blame = await git.raw(["blame", "--porcelain", "-L", `${line},${line}`, file]);
    let hash = blame.split("\n")[0].split(" ")[0];

    res_output.location = constructLocation({
        path: file,
        lineNumber: parseInt(line),
        column: parseInt(column),
        lastChangeHash: hash,
    });
    res_output.text = message;

    return true;
};
