const prisma = require("../config/prisma");

// Create Deployment
const createDeployment = async (req, res) => {
  try {
    const {
      version,
      status,
      environment,
      commitHash,
      branch,
      dockerImage,
      cloudProvider,
      aiSummary,
    } = req.body;

    const deployment = await prisma.deployment.create({
      data: {
        version,
        status,
        environment,
        commitHash,
        branch,
        dockerImage,
        cloudProvider,
        aiSummary,
      },
    });

    res.status(201).json(deployment);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Deployments
const getDeployments = async (req, res) => {
  try {
    const deployments = await prisma.deployment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(deployments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};




// Get Deployment By ID
const getDeploymentById = async (req, res) => {
  try {
    const deployment = await prisma.deployment.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!deployment) {
      return res.status(404).json({
        message: "Deployment not found",
      });
    }

    res.json(deployment);
  } catch (error) {
    console.error(error);
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Deployment
const deleteDeployment = async (req, res) => {
  try {
    await prisma.deployment.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Deployment deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


const updateDeployment = async (req, res) => {
  try {
    const deployment = await prisma.deployment.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.json(deployment);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createDeployment,
  getDeployments,
  getDeploymentById,
  updateDeployment,
  deleteDeployment,
};