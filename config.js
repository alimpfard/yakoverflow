const process = require('process');

var mongo_addr = process.env.MONGO_ADDR || 'mongodb://localhost';
var port = process.env.PORT || 8080;

module.exports = {
	port,
	mongo_addr,
	database: "fancy_db_name",
	serenityRepositoryPath: "serenity",
	serenityRepositoryRemote: "https://github.com/serenityos/serenity",
	// serenityRepositoryRemote: "file:///home/Test/Workspace/serenity",
};
