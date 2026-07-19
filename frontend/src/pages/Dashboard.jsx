import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatusCard from "../components/StatusCard";
import api from "../services/api";
import DeploymentTable from "../components/DeploymentTable";
import DeploymentPieChart from "../components/charts/DeploymentPieChart";
import AIAnalysisPieChart from "../components/charts/AIAnalysisPieChart";

function Dashboard() {
  const [deployments, setDeployments] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [search, setSearch] = useState("");

  // =========================
  // Deployment Statistics
  // =========================

  const totalDeployments = deployments.length;

  const successfulDeployments = deployments.filter(
    (d) => d.status === "Success"
  ).length;

  const failedDeployments = deployments.filter(
    (d) => d.status === "Failed"
  ).length;

  const runningDeployments = deployments.filter(
    (d) => d.status === "Running"
  ).length;

  const successRate =
    totalDeployments === 0
      ? 0
      : Math.round((successfulDeployments / totalDeployments) * 100);

  // =========================
  // AI Analysis Statistics
  // =========================

  const totalAnalyses = analyses.length;

  const criticalAnalyses = analyses.filter(
    (a) => a.severity === "Critical"
  ).length;

  const warningAnalyses = analyses.filter(
    (a) => a.severity === "Warning"
  ).length;

  const healthyAnalyses = analyses.filter(
    (a) => a.severity === "Healthy"
  ).length;

  // =========================
  // Search
  // =========================

  const filteredDeployments = deployments.filter((deployment) => {
    const keyword = search.toLowerCase();

    return (
      deployment.version.toLowerCase().includes(keyword) ||
      deployment.status.toLowerCase().includes(keyword) ||
      deployment.environment.toLowerCase().includes(keyword) ||
      deployment.branch.toLowerCase().includes(keyword) ||
      deployment.cloudProvider.toLowerCase().includes(keyword)
    );
  });

  // =========================
  // Fetch Data
  // =========================

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deploymentResponse = await api.get("/deployments");
        setDeployments(deploymentResponse.data);

        const analysisResponse = await api.get("/analysis");
        setAnalyses(analysisResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              Deployment Dashboard
            </h2>

            <Link
              to="/deployments/new"
              className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-lg font-semibold"
            >
              + New Deployment
            </Link>
          </div>

          {/* Deployment Cards */}

          <div className="grid grid-cols-4 gap-6">

            <StatusCard
              title="Total Deployments"
              status={totalDeployments}
              color="text-cyan-400"
            />

            <StatusCard
              title="Successful"
              status={successfulDeployments}
              color="text-green-400"
            />

            <StatusCard
              title="Failed"
              status={failedDeployments}
              color="text-red-400"
            />

            <StatusCard
              title="Success Rate"
              status={`${successRate}%`}
              color="text-yellow-400"
            />

          </div>

          {/* AI Analytics */}

          <h2 className="text-2xl font-bold mt-10 mb-4">
            AI Analytics
          </h2>

          <div className="grid grid-cols-4 gap-6">

            <StatusCard
              title="Total AI Analysis"
              status={totalAnalyses}
              color="text-cyan-400"
            />

            <StatusCard
              title="Critical Issues"
              status={criticalAnalyses}
              color="text-red-400"
            />

            <StatusCard
              title="Warning Issues"
              status={warningAnalyses}
              color="text-yellow-400"
            />

            <StatusCard
              title="Healthy"
              status={healthyAnalyses}
              color="text-green-400"
            />

          </div>

          {/* Chart */}

          <div className="grid grid-cols-2 gap-8 mt-10">

  <DeploymentPieChart deployments={deployments} />

  <AIAnalysisPieChart analyses={analyses} />

</div>

          {/* Search */}

          <div className="my-8">
            <input
              type="text"
              placeholder="Search by version, status, environment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          {/* Deployment Table */}

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Deployment History
          </h2>

          <DeploymentTable deployments={filteredDeployments} />

        </main>
      </div>
    </div>
  );
}

export default Dashboard;