import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-cyan-600 text-white font-semibold"
        : "text-gray-300 hover:bg-slate-800 hover:text-cyan-400"
    }`;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-700 min-h-screen p-5">
      <h2 className="text-2xl font-bold text-white mb-8">
        Dashboard
      </h2>

      <ul className="space-y-3">
        <li>
          <NavLink to="/dashboard" className={menuClass}>
            📊 Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/logs" className={menuClass}>
            📜 Logs
          </NavLink>
        </li>

        <li>
          <NavLink to="/analysis-history" className={menuClass}>
            🤖 AI Analysis
          </NavLink>
        </li>

        <li>
          <NavLink to="/settings" className={menuClass}>
            ⚙️ Settings
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;