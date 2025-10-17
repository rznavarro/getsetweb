import { Edit2 } from 'lucide-react';

interface Metric {
  id: string;
  title: string;
  value: string;
  icon: any;
}

interface MainMetricCardProps {
  metric: Metric;
  onEdit: (metric: Metric) => void;
}

export default function MainMetricCard({ metric, onEdit }: MainMetricCardProps) {
  const Icon = metric.icon;

  return (
    <div className="bg-[#1a1a1a] border border-[#FFD700]/30 rounded-xl p-8 shadow-lg hover:shadow-[#FFD700]/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-[#1f1f1f] group">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-lg shadow-[#FFD700]/30">
          <Icon className="w-6 h-6 text-[#0a0a0a]" />
        </div>
        <button
          onClick={() => onEdit(metric)}
          className="p-2 hover:bg-[#FFD700]/20 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          aria-label="Editar métrica"
        >
          <Edit2 className="w-5 h-5 text-[#FFD700] hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="border-b border-[#FFD700]/20 mb-4"></div>

      <h3 className="text-[#d4d4d4] text-sm font-light mb-3 tracking-wide">{metric.title}</h3>
      <p className="text-white text-3xl font-bold">{metric.value}</p>
    </div>
  );
}
