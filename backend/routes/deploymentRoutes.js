const express = require("express");

const router = express.Router();

const {
  createDeployment,
  getDeployments,
  getDeploymentById,
   updateDeployment,
  deleteDeployment,
} = require("../controllers/deploymentController");

router.post("/", createDeployment);

router.get("/", getDeployments);

router.get("/:id", getDeploymentById);

router.put("/:id", updateDeployment);

router.delete("/:id", deleteDeployment);

module.exports = router;