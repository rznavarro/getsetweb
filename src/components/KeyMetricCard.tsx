interface Metric {
  id: string;
  title: string;
  value: string;
  icon: string;
}

interface KeyMetricCardProps {
  metric: Metric;
  onEdit: (metric: Metric) => void;
}

export default function KeyMetricCard({ metric, onEdit }: KeyMetricCardProps) {

  return (
    <div className="bg-[#1a1a1a] border-b-2 border-[#FFD700]/30 rounded-lg p-6 hover:border-[#FFD700]/50 hover:shadow-lg hover:shadow-[#FFD700]/10 transition-all duration-500 hover:-translate-y-1 group">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[#d4d4d4] text-sm font-light tracking-wide">{metric.title}</h4>
        <button
          onClick={() => onEdit(metric)}
          className="p-3 hover:bg-[#FFD700]/20 rounded-lg transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0"
          aria-label="Editar métrica"
        >
          <span className="text-sm">✏️</span>
        </button>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-white text-2xl font-bold">{metric.value}</p>
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 flex items-center justify-center shadow-lg shadow-[#FFD700]/20">
          <span className="text-xl">{metric.icon}</span>
        </div>
      </div>
    </div>
  );
}
