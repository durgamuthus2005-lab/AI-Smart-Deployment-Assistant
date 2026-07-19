const prisma = require("./prismaService");

const saveAnalysis = async (log, analysis, severity) => {
  return await prisma.analysis.create({
    data: {
      log,
      analysis,
      severity,
    },
  });
};

const getAllAnalyses = async () => {
  return await prisma.analysis.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

module.exports = {
  saveAnalysis,
  getAllAnalyses,
};