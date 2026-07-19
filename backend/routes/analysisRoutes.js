const express = require("express");
const router = express.Router();

const { getAnalysisHistory } = require("../controllers/analysisController");

router.get("/", getAnalysisHistory);

module.exports = router;