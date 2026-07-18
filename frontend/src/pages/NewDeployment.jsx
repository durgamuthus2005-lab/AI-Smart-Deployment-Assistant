import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function NewDeployment() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    version: "",
    status: "",
    environment: "",
    commitHash: "",
    branch: "",
    dockerImage: "",
    cloudProvider: "",
    aiSummary: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await api.post("/deployments", form);

    alert("Deployment Created Successfully!");

    navigate("/");
  } catch (err) {
    console.log(err);
    console.log(err.response);
    console.log(err.response?.data);
    alert("Failed to create deployment");
  }
};

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">
        New Deployment
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 max-w-xl"
      >
        <input
          name="version"
          placeholder="Version"
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <input
          name="status"
          placeholder="Status"
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <input
          name="environment"
          placeholder="Environment"
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <input
          name="commitHash"
          placeholder="Commit Hash"
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <input
          name="branch"
          placeholder="Branch"
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <input
          name="dockerImage"
          placeholder="Docker Image"
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <input
          name="cloudProvider"
          placeholder="Cloud Provider"
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <textarea
          name="aiSummary"
          placeholder="AI Summary"
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <button
          className="bg-cyan-600 py-3 rounded"
          type="submit"
        >
          Save Deployment
        </button>
      </form>
    </div>
  );
}

export default NewDeployment;