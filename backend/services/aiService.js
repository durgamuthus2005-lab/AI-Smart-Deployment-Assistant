const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeDeployment = async (log) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are a DevOps expert.

Analyze the following deployment log.

Explain:
1. What happened?
2. If there is an error.
3. Why it happened.
4. How to fix it.

Deployment Log:
${log}
`,
  });

  return response.text;
};

module.exports = {
  analyzeDeployment,
};