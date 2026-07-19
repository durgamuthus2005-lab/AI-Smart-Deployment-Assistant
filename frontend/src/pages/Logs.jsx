import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Logs() {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-6">
            Deployment Logs
          </h2>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <p className="text-gray-400">
              Logs feature will be added in the next version.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Logs;