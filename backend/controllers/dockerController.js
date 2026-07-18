const docker = require("../services/dockerService");

// Get all containers
const getContainers = async (req, res) => {
  try {
    const containers = await docker.listContainers({ all: true });
    res.json(containers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch containers" });
  }
};

module.exports = {
  getContainers,
};