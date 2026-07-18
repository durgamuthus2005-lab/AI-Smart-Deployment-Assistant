import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatusCard from "../components/StatusCard";
import api from "../services/api";
import DeploymentTable from "../components/DeploymentTable";
import DeploymentPieChart from "../components/charts/DeploymentPieChart";

function Dashboard() {
  const [deployments, setDeployments] = useState([]);

  const [search, setSearch] = useState("");

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



useEffect(() => {
  const fetchDeployments = async () => {
    try {
      const response = await api.get("/deployments");
      setDeployments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchDeployments();
}, []);


console.log(deployments);

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

<div className="mt-10">
    <DeploymentPieChart deployments={deployments} />
</div> 

<div className="my-8">
  <input
    type="text"
    placeholder="Search by version, status, environment..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
  />
</div>

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