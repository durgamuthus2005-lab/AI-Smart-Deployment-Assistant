const express = require("express");
const router = express.Router();

const { analyzeContainer } = require("../controllers/dockerAIController");

router.post("/analyze", analyzeContainer);

module.exports = router;