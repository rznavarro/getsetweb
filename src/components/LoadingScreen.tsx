import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 segundos para mejor UX en móvil
    const interval = 100; // actualizar cada 100ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-1000">
      <div className="w-full max-w-2xl px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Loader2 className="w-16 h-16 text-[#FFD700] animate-spin" />
          </div>
          <h2 className="text-3xl font-light text-white mb-2 tracking-wide">Loading Dashboard...</h2>
          <p className="text-[#d4d4d4]">Preparing your executive experience</p>
        </div>

        <div className="space-y-4">
          <div className="relative h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#FFD700]/30">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] transition-all duration-300 ease-linear shadow-lg shadow-[#FFD700]/50"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#d4d4d4] text-sm">Progress</span>
            <span className="text-[#FFD700] text-2xl font-bold">{Math.floor(progress)}%</span>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="w-8 h-8 border-2 border-[#FFD700]/30 rounded-full animate-spin border-t-[#FFD700]"></div>
              <div className="absolute inset-0 w-8 h-8 border-2 border-transparent rounded-full animate-ping border-t-[#FFD700]/50"></div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6">
          {['Metrics', 'Analysis', 'Reports'].map((item, index) => (
            <div
              key={item}
              className={`text-center p-6 bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg transition-all duration-700 ease-out ${
                progress > index * 33 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
              }`}
            >
              <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
              </div>
              <p className="text-sm text-[#d4d4d4]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
