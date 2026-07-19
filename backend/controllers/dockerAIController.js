const { getContainerLogs } = require("../services/dockerLogService");
const { analyzeDeployment } = require("../services/aiService");

const analyzeContainer = async (req, res) => {
  try {
    const { containerId } = req.body;

    if (!containerId) {
      return res.status(400).json({
        message: "Container ID is required",
      });
    }

    const logs = await getContainerLogs(containerId);

    const analysis = await analyzeDeployment(logs);

    res.json({
      success: true,
      logs,
      analysis,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeContainer,
};