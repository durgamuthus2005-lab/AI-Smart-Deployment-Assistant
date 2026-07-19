const prisma = require("./prismaService");

const saveAnalysis = async (
  deploymentId,
  log,
  analysis,
  severity
) => {
  return await prisma.analysis.create({
    data: {
      deploymentId,
      log,
      analysis,
      severity,
    },
  });
};

const getAllAnalyses = async () => {
  return await prisma.analysis.findMany({
    include: {
      deployment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

module.exports = {
  saveAnalysis,
  getAllAnalyses,
};