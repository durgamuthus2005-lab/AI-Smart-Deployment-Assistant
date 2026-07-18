function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-700 min-h-screen p-5">
      <h2 className="text-xl font-bold text-white mb-8">
        Dashboard
      </h2>

      <ul className="space-y-5 text-gray-300">
        <li className="hover:text-cyan-400 cursor-pointer">
          Dashboard
        </li>

        <li className="hover:text-cyan-400 cursor-pointer">
          Deployments
        </li>

        <li className="hover:text-cyan-400 cursor-pointer">
          Logs
        </li>

        <li className="hover:text-cyan-400 cursor-pointer">
          AI Analysis
        </li>

        <li className="hover:text-cyan-400 cursor-pointer">
          Settings
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;