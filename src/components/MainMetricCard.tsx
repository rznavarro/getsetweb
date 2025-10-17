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
  // Diagnostic logging for emoji rendering issues
  console.log('MainMetricCard rendering:', {
    title: metric.title,
    icon: metric.icon,
    iconType: typeof metric.icon,
    iconLength: metric.icon.length,
    isEmoji: /\p{Emoji}/u.test(metric.icon)
  });

  // SVG icon mapping for safe text-based icons
  const getIconSvg = (iconKey: string) => {
    const iconMap: { [key: string]: string } = {
      'dollar-sign': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
      'users': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.01 2.01 0 0 0 18.06 7H15.9c-.38 0-.72.24-.84.61L13.5 11H11v2h2.5l.5 1H11v2h3.5l.5 1H11v2h4v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V20h2zM5.5 7C4.67 7 4 7.67 4 8.5S4.67 10 5.5 10 7 9.33 7 8.5 6.33 7 5.5 7zM3 20c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1H3v-1z"/></svg>`,
      'target': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
      'chart-up': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>`
    };
    return iconMap[iconKey] || iconKey;
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#FFD700]/30 rounded-xl p-8 shadow-lg hover:shadow-[#FFD700]/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-[#1f1f1f] group">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-lg shadow-[#FFD700]/30">
          <span className="text-2xl" dangerouslySetInnerHTML={{ __html: getIconSvg(metric.icon) }} />
        </div>
        <button
          onClick={() => onEdit(metric)}
          className="p-3 hover:bg-[#FFD700]/20 rounded-lg transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0"
          aria-label="Editar métrica"
        >
          <span className="text-lg">Edit</span>
        </button>
      </div>

      <div className="border-b border-[#FFD700]/20 mb-4"></div>

      <h3 className="text-[#d4d4d4] text-sm font-light mb-3 tracking-wide">{metric.title}</h3>
      <p className="text-white text-3xl font-bold">{metric.value}</p>
    </div>
  );
}
