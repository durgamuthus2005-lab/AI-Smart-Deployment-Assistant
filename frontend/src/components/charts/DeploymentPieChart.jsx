import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function DeploymentPieChart({ deployments }) {
  const success = deployments.filter(
    (d) => d.status === "Success"
  ).length;

  const failed = deployments.filter(
    (d) => d.status === "Failed"
  ).length;

  const running = deployments.filter(
    (d) => d.status === "Running"
  ).length;

  const data = [
    { name: "Success", value: success },
    { name: "Failed", value: failed },
    { name: "Running", value: running },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#facc15",
  ];

  return (
    <div className="bg-slate-900 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">
        Deployment Status
      </h2>

      <PieChart width={350} height={300}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default DeploymentPieChart;