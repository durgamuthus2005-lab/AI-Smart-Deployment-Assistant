function StatusCard({ title, status, color }) {
  return (
    <div className="bg-slate-900 rounded-xl p-5 shadow-lg">
      <h2 className="text-gray-400">{title}</h2>

      <p className={`text-2xl font-bold ${color}`}>
        {status}
      </p>
    </div>
  );
}

export default StatusCard;