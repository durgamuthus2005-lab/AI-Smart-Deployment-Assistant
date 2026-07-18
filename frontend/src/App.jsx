import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import NewDeployment from "./pages/NewDeployment";
import EditDeployment from "./pages/EditDeployment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route
        path="/deployments/new"
        element={<NewDeployment />}
      />

      <Route
        path="/deployments/edit/:id"
        element={<EditDeployment />}
      />
    </Routes>
  );
}

export default App;