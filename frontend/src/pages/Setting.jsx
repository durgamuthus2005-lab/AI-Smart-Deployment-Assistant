import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Setting() {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-6">
            Settings
          </h2>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <p className="text-gray-400">
              Settings page coming soon.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Setting;