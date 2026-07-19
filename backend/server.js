const express = require("express");
const cors = require("cors");
const statusRoutes = require("./routes/statusRoutes");
const deploymentRoutes = require("./routes/deploymentRoutes");
const dockerRoutes = require("./routes/dockerRoutes");
const aiRoutes = require("./routes/aiRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "AI Smart Deployment Assistant Backend is Running 🚀"
    });
});

const PORT = process.env.PORT || 5000;
app.use("/api/status", statusRoutes);
app.use("/api/deployments", deploymentRoutes);
app.use("/api/docker", dockerRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/analysis", analysisRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});