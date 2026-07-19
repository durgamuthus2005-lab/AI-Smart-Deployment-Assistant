import api from "../services/api";

function DeploymentTable({ deployments }) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deployment?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/deployments/${id}`);

      alert("Deployment deleted successfully!");

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };


  const handleAnalyze = async (deployment) => {
  try {
    const log = `
Deployment Version : ${deployment.version}
Status             : ${deployment.status}
Environment        : ${deployment.environment}
Branch             : ${deployment.branch}
Cloud Provider     : ${deployment.cloudProvider}
`;

    const response = await api.post("/analysis", {
  deploymentId: deployment.id,
  log,
});

    alert("AI Analysis Completed Successfully!");

    console.log(response.data);

  } catch (error) {
    console.error(error);
    alert("AI Analysis Failed");
  }
};


  return (
    <div className="mt-8 bg-slate-900 rounded-xl shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="p-4 text-left">Version</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Environment</th>
            <th className="p-4 text-left">Branch</th>
            <th className="p-4 text-left">Cloud</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {deployments.map((deployment) => (
            <tr
              key={deployment.id}
              className="border-b border-slate-700 hover:bg-slate-800"
            >
              <td className="p-4">{deployment.version}</td>

              <td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold ${
      deployment.status.toLowerCase() === "success"
        ? "bg-green-500 text-white"
        : deployment.status.toLowerCase() === "failed"
        ? "bg-red-500 text-white"
        : deployment.status.toLowerCase() === "running"
        ? "bg-yellow-400 text-black"
        : "bg-gray-500 text-white"
    }`}
  >
    {deployment.status}
  </span>
</td>

              <td className="p-4">
                {deployment.environment}
              </td>

              <td className="p-4">
                {deployment.branch}
              </td>

              <td className="p-4">
                {deployment.cloudProvider}
              </td>

              <td className="p-4 flex gap-2">
  <button
    onClick={() =>
      window.location.href = `/deployments/edit/${deployment.id}`
    }
    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(deployment.id)}
    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
  >
    Delete
  </button>

  <button
  onClick={() => handleAnalyze(deployment)}
  className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded"
>
  Analyze
</button>

</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeploymentTable;