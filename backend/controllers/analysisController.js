const { getAllAnalyses } = require("../services/analysisService");

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
  getAnalysisHistory,
};