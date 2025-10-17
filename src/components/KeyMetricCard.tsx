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
  // Diagnostic logging for emoji rendering issues
  console.log('KeyMetricCard rendering:', {
    title: metric.title,
    icon: metric.icon,
    iconType: typeof metric.icon,
    iconLength: metric.icon.length,
    isEmoji: /\p{Emoji}/u.test(metric.icon)
  });

  // SVG icon mapping for safe text-based icons
  const getIconSvg = (iconKey: string) => {
    const iconMap: { [key: string]: string } = {
      'fire': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>`,
      'dollar-bill': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 6h20v2H2V6zm0 4h20v2H2v-2zm0 4h20v2H2v-2zm0 4h20v2H2v-2z"/></svg>`,
      'ticket': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 3H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM6 7h5v2H6V7zm0 4h5v2H6v-2zm0 4h5v2H6v-2zm10 2h-3v-2h3v2zm0-4h-3V9h3v2zm0-4h-3V5h3v2z"/></svg>`,
      'star': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
      'refresh': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 14.87 20 13.48 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 9.13 4 10.52 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>`,
      'chart-bar': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>`
    };
    return iconMap[iconKey] || iconKey;
  };

  return (
    <div className="bg-[#1a1a1a] border-b-2 border-[#FFD700]/30 rounded-lg p-6 hover:border-[#FFD700]/50 hover:shadow-lg hover:shadow-[#FFD700]/10 transition-all duration-500 hover:-translate-y-1 group">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[#d4d4d4] text-sm font-light tracking-wide">{metric.title}</h4>
        <button
          onClick={() => onEdit(metric)}
          className="p-3 hover:bg-[#FFD700]/20 rounded-lg transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0"
          aria-label="Editar métrica"
        >
          <span className="text-sm">Edit</span>
        </button>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-white text-2xl font-bold">{metric.value}</p>
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 flex items-center justify-center shadow-lg shadow-[#FFD700]/20">
          <span className="text-xl" dangerouslySetInnerHTML={{ __html: getIconSvg(metric.icon) }} />
        </div>
      </div>
    </div>
  );
}
