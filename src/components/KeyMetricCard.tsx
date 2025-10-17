import React from 'react';
import { Edit } from 'lucide-react';

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
          className="p-3 bg-[#FFD700]/10 hover:bg-[#FFD700]/30 border border-[#FFD700]/30 hover:border-[#FFD700]/60 rounded-lg transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 shadow-sm hover:shadow-md"
          aria-label="Editar métrica"
        >
          <Edit size={16} className="text-[#FFD700]" />
        </button>
      </div>
      <div className="flex items-center justify-start">
        <p className="text-white text-2xl font-bold">{metric.value}</p>
      </div>
    </div>
  );
}
