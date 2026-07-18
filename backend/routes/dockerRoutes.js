const express = require("express");
const router = express.Router();

const {
  getContainers,
} = require("../controllers/dockerController");

router.get("/containers", getContainers);

module.exports = router;