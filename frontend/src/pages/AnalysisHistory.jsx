import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { exportAnalysisPDF } from "../services/pdfService";

const AnalysisHistory = () => {
  const [analyses, setAnalyses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/analysis");
      console.log("API Response:", response.data);
     
      setAnalyses(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const filteredAnalyses = analyses.filter((item) => {
  const keyword = search.toLowerCase();


  return (
    item.severity.toLowerCase().includes(keyword) ||
    item.analysis.toLowerCase().includes(keyword) ||
    item.log.toLowerCase().includes(keyword)
  );
});

  console.log("Analyses:", analyses);
console.log("Filtered:", filteredAnalyses);


  return (
  <div className="bg-slate-950 text-white min-h-screen">
    <Navbar />

    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-8">
          AI Analysis History
        </h2>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by severity, log, or analysis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
          />
        </div>

        {filteredAnalyses.length === 0 ? (
          <div className="bg-slate-900 p-6 rounded-xl text-center">
            No Analysis Found
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAnalyses.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg"
              >
                {/* We'll improve this card in the next step */}

                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">
                    AI Analysis
                  </h3>

                  <span
  className={`px-4 py-2 rounded-full text-sm font-semibold ${
    item.severity === "Critical"
      ? "bg-red-600 text-white"
      : item.severity === "Warning"
      ? "bg-yellow-500 text-black"
      : "bg-green-600 text-white"
  }`}
>
  {item.severity}
</span>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-cyan-400">
                    Deployment Log
                  </h4>

                  <p className="mt-2 text-gray-300 whitespace-pre-wrap">
                    {item.log}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-cyan-400">
                    AI Analysis
                  </h4>

                  <p className="mt-2 text-gray-300 whitespace-pre-wrap">
                    {item.analysis}
                  </p>
                </div>

                <p className="text-sm text-gray-400 border-t border-slate-700 pt-4">
  Created:{" "}
  {new Date(item.createdAt).toLocaleString()}
</p>

<div className="mt-5 flex justify-end">
  <button
    onClick={() => exportAnalysisPDF(item)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
  >
    📄 Export PDF
  </button>
</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  </div>
);
};

export default AnalysisHistory;