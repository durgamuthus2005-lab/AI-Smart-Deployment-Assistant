const Docker = require("dockerode");

// Connect to local Docker Engine
const docker = new Docker();

module.exports = docker;