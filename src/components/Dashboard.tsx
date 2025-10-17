import { useState } from 'react';
import { TrendingUp, Users, Target, DollarSign, UserPlus, ShoppingCart, CreditCard, Heart, RotateCcw, TrendingDown } from 'lucide-react';
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
    { id: '1', title: 'Ingresos Totales', value: '$0', icon: DollarSign },
    { id: '2', title: 'Clientes Activos', value: '0', icon: Users },
    { id: '3', title: 'Tasa de Conversión', value: '0%', icon: Target },
    { id: '4', title: 'ROI', value: '0%', icon: TrendingUp },
  ]);

  const [keyMetrics, setKeyMetrics] = useState<Metric[]>(savedMetrics?.keyMetrics || [
    { id: '5', title: 'Nuevos Leads', value: '0', icon: UserPlus },
    { id: '6', title: 'Ventas del Mes', value: '0', icon: ShoppingCart },
    { id: '7', title: 'Ticket Promedio', value: '$0', icon: CreditCard },
    { id: '8', title: 'Satisfacción Cliente', value: '0%', icon: Heart },
    { id: '9', title: 'Tasa de Retención', value: '0%', icon: RotateCcw },
    { id: '10', title: 'Margen de Ganancia', value: '0%', icon: TrendingDown },
  ]);

  const [editingMetric, setEditingMetric] = useState<Metric | null>(null);

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
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/get_setweb/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="/logo_getsetweb.png"
                  alt="GetSetWeb Logo"
                  className="w-16 h-16 object-contain cursor-pointer"
                />
              </a>
              <div>
                <h1 className="text-3xl font-light text-white tracking-wide">Dashboard Ejecutivo</h1>
                <p className="text-[#d4d4d4] mt-2">GetSetWeb - Panel de Control</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-12">
          <h2 className="text-xl font-light text-white mb-8 tracking-wide">Métricas Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          <h2 className="text-xl font-light text-white mb-8 tracking-wide">Métricas Clave</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyMetrics.map((metric) => (
              <KeyMetricCard key={metric.id} metric={metric} onEdit={handleEdit} />
            ))}
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="text-center">
          <a
            href="https://vortexia-new.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#a3a3a3] hover:text-[#FFD700] transition-colors duration-300 cursor-pointer"
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
