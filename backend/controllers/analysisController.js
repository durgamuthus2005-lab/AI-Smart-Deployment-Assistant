const { analyzeDeployment } = require("../services/aiService");
const {
  saveAnalysis,
  getAllAnalyses,
} = require("../services/analysisService");

const runAnalysis = async (req, res) => {
  try {
    const { deploymentId, log } = req.body;

    if (!log) {
      return res.status(400).json({
        success: false,
        message: "Deployment log is required",
      });
    }

    // Ask Gemini
    const result = await analyzeDeployment(log);

    // Detect severity
    let severity = "Healthy";

    const lower = result.toLowerCase();

    if (
      lower.includes("error") ||
      lower.includes("failed") ||
      lower.includes("critical")
    ) {
      severity = "Critical";
    } else if (
      lower.includes("warning") ||
      lower.includes("issue")
    ) {
      severity = "Warning";
    }

    // Save to database
    
    const saved = await saveAnalysis(
      deploymentId,
      log,
      result,
      severity
    );

    res.json({
      success: true,
      data: saved,
    });

  } catch (error) {
  console.error("AI Analysis Error:");
  console.error(error);

  if (error.response?.data) {
    console.error(error.response.data);
  }

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

const getAnalysisHistory = async (req, res) => {
  try {
    const analyses = await getAllAnalyses();

    res.json({
      success: true,
      count: analyses.length,
      data: analyses,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analysis history",
    });
  }
};

module.exports = {
  runAnalysis,
  getAnalysisHistory,
};