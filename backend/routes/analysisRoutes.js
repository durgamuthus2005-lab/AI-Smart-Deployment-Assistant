const express = require("express");
const router = express.Router();

const {
  runAnalysis,
  getAnalysisHistory,
} = require("../controllers/analysisController");

router.post("/", runAnalysis);

router.get("/", getAnalysisHistory);

module.exports = router;