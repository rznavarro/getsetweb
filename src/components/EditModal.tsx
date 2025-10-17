import { useState } from 'react';
import { X } from 'lucide-react';

interface Metric {
  id: string;
  title: string;
  value: string;
  icon: any;
}

interface EditModalProps {
  metric: Metric;
  onSave: (newValue: string) => void;
  onCancel: () => void;
}

export default function EditModal({ metric, onSave, onCancel }: EditModalProps) {
  const [value, setValue] = useState(metric.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSave(value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-[#1a1a1a] border border-[#FFD700]/30 rounded-2xl max-w-md w-full p-8 shadow-2xl shadow-[#FFD700]/20 animate-scale-in transform scale-95 animate-in">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-light text-white tracking-wide">Edit Metric</h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-[#FFD700]/20 rounded-lg transition-all duration-300 hover:scale-110"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-[#d4d4d4]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-light text-[#d4d4d4] mb-3 tracking-wide">
              {metric.title}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-4 bg-[#0a0a0a] border border-[#FFD700]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] focus:shadow-lg focus:shadow-[#FFD700]/20 transition-all duration-300 text-base min-h-[44px]"
              placeholder="Enter the new value"
              autoFocus
              inputMode="text"
            />
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              className="flex-1 py-4 px-6 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0a0a0a] font-bold rounded-lg hover:shadow-lg hover:shadow-[#FFD700]/50 transform hover:scale-105 transition-all duration-300 min-h-[44px]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-4 px-6 border-2 border-[#666] text-[#d4d4d4] font-medium rounded-lg hover:border-[#888] hover:bg-[#2a2a2a] transition-all duration-300 min-h-[44px]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
