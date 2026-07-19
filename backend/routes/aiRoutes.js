const express = require("express");
const router = express.Router();

const { analyzeLog } = require("../controllers/aiController");

router.post("/analyze", analyzeLog);

module.exports = router;