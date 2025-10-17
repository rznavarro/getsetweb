interface Metric {
  id: string;
  title: string;
  value: string;
  icon: string;
}

interface MainMetricCardProps {
  metric: Metric;
  onEdit: (metric: Metric) => void;
}

export default function MainMetricCard({ metric, onEdit }: MainMetricCardProps) {

  return (
    <div className="bg-[#1a1a1a] border border-[#FFD700]/30 rounded-xl p-8 shadow-lg hover:shadow-[#FFD700]/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-[#1f1f1f] group">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-lg shadow-[#FFD700]/30">
          <span className="text-2xl">{metric.icon}</span>
        </div>
        <button
          onClick={() => onEdit(metric)}
          className="p-3 hover:bg-[#FFD700]/20 rounded-lg transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0"
          aria-label="Editar métrica"
        >
          <span className="text-lg">✏️</span>
        </button>
      </div>

      <div className="border-b border-[#FFD700]/20 mb-4"></div>

      <h3 className="text-[#d4d4d4] text-sm font-light mb-3 tracking-wide">{metric.title}</h3>
      <p className="text-white text-3xl font-bold">{metric.value}</p>
    </div>
  );
}
