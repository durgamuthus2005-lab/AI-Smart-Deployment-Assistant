const { analyzeDeployment } = require("../services/aiService");
const { saveAnalysis } = require("../services/analysisService");

const analyzeLog = async (req, res) => {
  try {
    const { log } = req.body;

    if (!log) {
      return res.status(400).json({
        message: "Deployment log is required",
      });
    }

    const result = await analyzeDeployment(log);

    let severity = "Healthy";

const lowerResult = String(result).toLowerCase();

if (
  lowerResult.includes("error") ||
  lowerResult.includes("failed") ||
  lowerResult.includes("critical")
) {
  severity = "Critical";
} else if (
  lowerResult.includes("warning") ||
  lowerResult.includes("issue")
) {
  severity = "Warning";
}

await saveAnalysis(log, result, severity);

res.json({
  success: true,
  analysis: result,
  severity,
});

} catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "AI analysis failed",
    });
  }
};

module.exports = {
  analyzeLog,
};