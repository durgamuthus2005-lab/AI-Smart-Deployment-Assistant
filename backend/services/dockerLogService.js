const docker = require("./dockerService");

const getContainerLogs = async (containerId) => {
  try {
    const container = docker.getContainer(containerId);

    const logs = await container.logs({
      stdout: true,
      stderr: true,
      tail: 100,
    });

    return logs.toString("utf8");
  } catch (error) {
    console.error("Docker Log Error:", error);  
    throw error;                                
  }
};

module.exports = {
  getContainerLogs,
};