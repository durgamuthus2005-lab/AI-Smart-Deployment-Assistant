import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditDeployment() {
  const { id } = useParams();
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

  useEffect(() => {
    fetchDeployment();
  }, []);

  const fetchDeployment = async () => {
    try {
      const response = await api.get(`/deployments/${id}`);
      setForm(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/deployments/${id}`, form);

      alert("Deployment Updated Successfully!");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-3xl font-bold mb-8">
        Edit Deployment
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6"
      >

        <input
          name="version"
          value={form.version}
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <input
          name="status"
          value={form.status}
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <input
          name="environment"
          value={form.environment}
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <input
          name="branch"
          value={form.branch}
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <input
          name="commitHash"
          value={form.commitHash}
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <input
          name="dockerImage"
          value={form.dockerImage}
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <input
          name="cloudProvider"
          value={form.cloudProvider}
          onChange={handleChange}
          className="p-3 rounded bg-slate-800"
        />

        <textarea
          name="aiSummary"
          value={form.aiSummary}
          onChange={handleChange}
          className="col-span-2 p-3 rounded bg-slate-800"
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold"
        >
          Update Deployment
        </button>

      </form>

    </div>
  );
}

export default EditDeployment;