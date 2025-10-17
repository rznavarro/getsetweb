import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import MainMetricCard from './MainMetricCard';
import KeyMetricCard from './KeyMetricCard';
import EditModal from './EditModal';

interface Metric {
  id: string;
  title: string;
  value: string;
  icon: any;
}

interface DashboardProps {
  savedMetrics?: any;
  onMetricsChange?: (metrics: any) => void;
}

export default function Dashboard({ savedMetrics, onMetricsChange }: DashboardProps) {
  const [mainMetrics, setMainMetrics] = useState<Metric[]>(savedMetrics?.mainMetrics || [
    { id: '1', title: 'Total Revenue', value: '$0', icon: '💰' },
    { id: '2', title: 'Active Clients', value: '0', icon: '👥' },
    { id: '3', title: 'Conversion Rate', value: '0%', icon: '🎯' },
    { id: '4', title: 'ROI', value: '0%', icon: '📈' },
  ]);

  const [keyMetrics, setKeyMetrics] = useState<Metric[]>(savedMetrics?.keyMetrics || [
    { id: '5', title: 'New Leads', value: '0', icon: '🔥' },
    { id: '6', title: 'Monthly Sales', value: '0', icon: '💵' },
    { id: '7', title: 'Average Ticket', value: '$0', icon: '🎫' },
    { id: '8', title: 'Customer Satisfaction', value: '0%', icon: '⭐' },
    { id: '9', title: 'Retention Rate', value: '0%', icon: '🔄' },
    { id: '10', title: 'Profit Margin', value: '0%', icon: '📊' },
  ]);

  const [editingMetric, setEditingMetric] = useState<Metric | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleEdit = (metric: Metric) => {
    setEditingMetric(metric);
  };

  const handleSave = (newValue: string) => {
    if (editingMetric) {
      const updatedMainMetrics = mainMetrics.map((m) =>
        m.id === editingMetric.id ? { ...m, value: newValue } : m
      );
      const updatedKeyMetrics = keyMetrics.map((m) =>
        m.id === editingMetric.id ? { ...m, value: newValue } : m
      );

      setMainMetrics(updatedMainMetrics);
      setKeyMetrics(updatedKeyMetrics);

      // Save to localStorage
      const metricsToSave = {
        mainMetrics: updatedMainMetrics,
        keyMetrics: updatedKeyMetrics,
      };
      localStorage.setItem('dashboard_metrics', JSON.stringify(metricsToSave));

      if (onMetricsChange) {
        onMetricsChange(metricsToSave);
      }
    }
    setEditingMetric(null);
  };

  const handleCancel = () => {
    setEditingMetric(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] animate-fade-in">
      <header className="bg-[#1a1a1a] border-b border-[#FFD700]/30 shadow-lg shadow-[#FFD700]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <a
                href="https://www.instagram.com/get_setweb/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="/logo_getsetweb.png"
                  alt="GetSetWeb Logo"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain cursor-pointer"
                />
              </a>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-white tracking-wide truncate">Executive Dashboard</h1>
                <p className="text-[#d4d4d4] text-sm sm:text-base mt-1 sm:mt-2">GetSetWeb - Control Panel</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 hover:bg-[#FFD700]/20 rounded-lg transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#FFD700]" />
              ) : (
                <Menu className="w-6 h-6 text-[#FFD700]" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-6 pt-6 border-t border-[#FFD700]/20">
              <div className="flex flex-col space-y-4">
                <a
                  href="https://www.instagram.com/get_setweb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 hover:bg-[#FFD700]/10 rounded-lg transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img
                    src="/logo_getsetweb.png"
                    alt="GetSetWeb Logo"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-[#d4d4d4]">Visit Instagram</span>
                </a>
                <a
                  href="https://vortexia-new.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 hover:bg-[#FFD700]/10 rounded-lg transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-[#d4d4d4]">Created by Vortexia</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 lg:py-12">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-light text-white mb-6 sm:mb-8 tracking-wide">Main Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {mainMetrics.map((metric) => (
              <MainMetricCard
                key={metric.id}
                metric={metric}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-light text-white mb-6 sm:mb-8 tracking-wide">Key Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {keyMetrics.map((metric) => (
              <KeyMetricCard key={metric.id} metric={metric} onEdit={handleEdit} />
            ))}
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
        <div className="text-center">
          <a
            href="https://vortexia-new.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-xs text-[#a3a3a3] hover:text-[#FFD700] transition-colors duration-300 cursor-pointer"
          >
            created by vortexia
          </a>
        </div>
      </footer>

      {editingMetric && (
        <EditModal
          metric={editingMetric}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
