import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#ef4444", "#eab308", "#22c55e"];

function AIAnalysisPieChart({ analyses }) {
  const data = [
    {
      name: "Critical",
      value: analyses.filter((a) => a.severity === "Critical").length,
    },
    {
      name: "Warning",
      value: analyses.filter((a) => a.severity === "Warning").length,
    },
    {
      name: "Healthy",
      value: analyses.filter((a) => a.severity === "Healthy").length,
    },
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">
        AI Severity Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AIAnalysisPieChart;