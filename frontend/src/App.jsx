import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import NewDeployment from "./pages/NewDeployment";
import EditDeployment from "./pages/EditDeployment";
import AnalysisHistory from "./pages/AnalysisHistory";
import Logs from "./pages/Logs";
import Setting from "./pages/Setting";

function App() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Deployments */}
      
      <Route path="/deployments/new" element={<NewDeployment />} />
      <Route
        path="/deployments/edit/:id"
        element={<EditDeployment />}
      />

      {/* AI Analysis */}
      <Route
        path="/analysis-history"
        element={<AnalysisHistory />}
      />

      {/* Logs */}
      <Route path="/logs" element={<Logs />} />

      {/* Settings */}
      <Route path="/settings" element={<Setting />} />
    </Routes>
  );
}

export default App;